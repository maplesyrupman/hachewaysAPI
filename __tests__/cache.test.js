const cache = require('../helpers/serverCache')

describe('cache can store and retrieve posts and tags', () => {
    test('stores post in cache', () => {
        const post = {id: 2, tags: ['tag1', 'tag2']}
        cache.addPost(post)
    
        expect(Object.values(cache.getAllPosts()).length).toBe(1)
    })

    test('gets post from cache', () => {
        const cachedPost = cache.getPost(2)
    
        expect(cachedPost.id).toBe(2)
    })

    test('stores tag in cache and checks if cache has tag', () => {
        let tag = 'tag'
        cache.addTag(tag)

        expect(cache.hasTag(tag)).toBe(true)
    })

    test('gets posts with certain tag from cache', () => {
        const posts = [
            { id:1, tags: ['tag1', 'tag2', 'tag3']},
            { id:2, tags: ['tag1', 'tag2', 'tag3']},
            { id:3, tags: ['tag1', 'tag2', 'tag3']},
            { id:4, tags: ['tag1', 'tag2', 'tag3', 'tag4']},
            { id:5, tags: ['tag1', 'tag2', 'tag4']},
            { id:6, tags: ['tag1', 'tag2']},
        ]  
        posts.forEach(post => cache.addPost(post))

        const cachedPosts1 = cache.getPostsByTags(['tag1'])
        const cachedPosts2 = cache.getPostsByTags(['tag1', 'tag2'])
        const cachedPosts3 = cache.getPostsByTags(['tag3'])
        const cachedPosts4 = cache.getPostsByTags(['tag4'])

        expect(cachedPosts1.length).toBe(6)
        expect(cachedPosts2.length).toBe(6)
        expect(cachedPosts3.length).toBe(4)
        expect(cachedPosts4.length).toBe(2)
    })
})



