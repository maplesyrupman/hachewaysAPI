module.exports = async function fetchTags(tagArr) {
    const apiUrl = 'https://api.hatchways.io/assessment/blog/posts'
    const requests = tagArr.map(tag => fetch(apiUrl + tag))

    try {
        const rawResults = await Promise.all(requests)
        const results = await Promise.all(rawResults.map(async (result) => await result.json()))
        return results
    } catch (err) {
        return err
    }
}