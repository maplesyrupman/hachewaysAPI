const { set } = require('lodash')
const mergeSort = require('../helpers/mergeSort')

async function getPosts(req, res) {
    const apiUrl = 'https://api.hatchways.io/assessment/blog/posts'
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

    tags = tags.split(',').map(tag => `?tag=${tag}`)
    let postMap = {}

    const requests = tags.map(tag => fetch(apiUrl + tag))

    try {
        let results = await Promise.all(requests)
        for (let i = 0; i < results.length; i++) {
            const jsonPosts = await results[i].json()
            for (let j=0;j<jsonPosts.posts.length;j++) {
                const post = jsonPosts.posts[j]
                console.log(post.id)
                postMap[post.id] = post
                console.log(postMap)
            }
        }
    } catch (err) {
        return res.status(500).json({ err: String(err) })
    }
    const sortedPosts = mergeSort(Object.values(postMap), sortBy, direction)
    console.log(sortedPosts.length)
    return res.status(200).json({ posts: sortedPosts })
}

module.exports = { getPosts }