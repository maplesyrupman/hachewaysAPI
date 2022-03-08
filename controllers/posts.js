const mergeSort = require('../helpers/mergeSort')
const cache = require('../helpers/serverCache')
const fetchTags = require('../helpers/fetchTags')

async function getPosts(req, res) {
    let { tags, sortBy, direction } = req.query

    const errMsg =
        !tags ? 'Tags parameter is required' :
            sortBy && !['id', 'reads', 'likes', 'popularity'].includes(sortBy) ? 'sortBy parameter is invalid' :
                direction && !['desc', 'asc'].includes(direction) ? 'direction parameter is invalid' :
                    false

    if (errMsg) {
        res.status(400).json({ error: errMsg })
        return
    }

    tags = tags.split(',')
    const tagsInCache = []
    const tagsToFetch = []

    for (let i=0;i<tags.length;i++) {
        if (cache.hasTag(tags[i])) {
            tagsInCache.push(tags[i])
        } else {
            tagsToFetch.push(tags[i])
        }
    }

    const postMap = {}

    cache.getPostsByTags(tagsInCache).forEach(post => postMap[post.id] = post)

    try {
        const tagQueryStrings = tagsToFetch.map(tag => `?tag=${tag}`)
        const fetchedPosts = await fetchTags(tagQueryStrings, res)
        

        for (let i=0;i<fetchedPosts.length; i++) {
            const posts = fetchedPosts[i].posts
            for (let e=0;e<posts.length; e++) {
                const post = posts[e]
                cache.addPost(post)
                postMap[post.id] = post
            }
        }
        cache.addTags(tagsToFetch)
        const sortedPosts = mergeSort(Object.values(postMap), sortBy, direction)
        return res.status(200).json({ posts: sortedPosts })

    } catch (err) {
        res.status(500).json({error: err})
    }
}

module.exports = { getPosts }