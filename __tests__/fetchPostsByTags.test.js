const fetchPostsByTags = require('../helpers/fetchTags')

describe('accesses api and retrieves posts', () => {
    test('returns an array', async () => {
        const posts = await fetchPostsByTags(['health'])
        
        expect(Array.isArray(posts)).toBe(true)
    })
})