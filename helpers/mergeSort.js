function merge(left, right, sortBy, direction) {
    const sortedArr = []
    let Lidx = 0
    let Ridx = 0

    while (Lidx < left.length && Ridx < right.length) {
        if (direction === 'desc') {
            if (left[Lidx][sortBy] > right[Ridx][sortBy]) {
                sortedArr.push(left[Lidx])
                Lidx++
            } else {
                sortedArr.push(right[Ridx])
                Ridx++
            }
        } else {
            if (left[Lidx][sortBy] < right[Ridx][sortBy]) {
                sortedArr.push(left[Lidx])
                Lidx++
            } else {
                sortedArr.push(right[Ridx])
                Ridx++
            }
        }
    }

    return sortedArr.concat(left.slice(Lidx)).concat(right.slice(Ridx))
}

module.exports = function mergeSort(arr, sortBy, direction) {
    if (arr.length <= 1) {
        return arr
    } 
    const mid = Math.floor(arr.length/2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    return merge(mergeSort(left, sortBy, direction), mergeSort(right, sortBy, direction), sortBy, direction)
}