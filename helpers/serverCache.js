const nodeCache = require('node-cache')
const myCache = new nodeCache()

const cache = (() => {
    myCache.set('tags', new Set())
    myCache.set('posts', {})


    function getPostsByTags(tagArr) {
        const posts = Object.values(myCache.get('posts')).filter(post => {
            for (let i=0;i<tagArr.length;i++) {
                if (post.tags.includes(tagArr[i])) return true
            }
            return false
        })
        return posts
    }

    function getAllPosts() {
        return myCache.get('posts')
    }

    function getPost(key) {
        return myCache.get('posts')[key]
    }

    function addPost(post) {
        const posts = myCache.get('posts')
        posts[post.id] = post
        myCache.set('posts', posts)
    }

    function hasTag(tag) {
        return myCache.get('tags').has(tag)
    }

    function addTag(tag) {
        const tags = myCache.get('tags')
        tags.add(tag)
        myCache.set('tags', tags)
    }

    return {
        getAllPosts,
        getPost,
        addPost,
        hasTag,
        addTag,
        getPostsByTags
    }
})()

module.exports = cache