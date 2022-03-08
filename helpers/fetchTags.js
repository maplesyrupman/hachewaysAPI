module.exports = async function fetchPostsByTags(tagArr) {
    const apiUrl = 'https://api.hatchways.io/assessment/blog/posts'
    const requests = tagArr.map(tag => fetch(apiUrl + tag))

    try {
        const rawResults = await Promise.all(requests)
        let results = await Promise.all(rawResults.map(async (result) => await result.json()))
        const postArr = []

        for (let i=0;i<results.length; i++) {
            const posts = results[i].posts
            for (let e=0;e<posts.length; e++) {
                postArr.push(posts[e])
            }
        }
        return postArr
        
    } catch (err) {
        return err
    }
}