

async function getPosts(req, res) {
    const apiUrl = 'https://api.hatchways.io/assessment/blog/posts'
    let {tags, sortBy, direction} = req.query

    const errMsg = 
        !tags ? 'Tags parameter is required' :
        sortBy && !['id', 'reads', 'likes', 'popularity'].includes(sortBy) ? 'sortBy parameter is invalid' :
        direction && !['desc', 'asc'].includes(direction) ? 'direction parameter is invalid' :
        false

    if (errMsg) {
        res.status(400).json({error: errMsg})
        return 
    }

    tags = tags.split(',').map(tag => `?tag=${tag}`)
    let posts = new Set()

    for (let i=0; i<tags.length; i++) {
        const rawPosts = await fetch(apiUrl + tags[i])
        const tagPosts = await rawPosts.json().then(data => data.posts)

        tagPosts.forEach(post => posts.add(post))        
    }

    res.status(200).json({posts: [...posts]})
}

module.exports = { getPosts }