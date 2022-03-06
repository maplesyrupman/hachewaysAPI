const mergeSort = require('../helpers/mergeSort')

const unsortedArr = []
for (let i=0; i<100; i++) {
    unsortedArr.push({'this': Math.floor(Math.random() * 100)})
}

test('sorts unsorted array, asc', () => {
    const sortedArray = mergeSort(unsortedArr, 'this', 'asc')
    expect(sortedArray).toBeSortedBy('this')
})

test('sorts unsorted array, desc', () => {
    const sortedArray = mergeSort(unsortedArr, 'this', 'desc')
    console.log(sortedArray)
    expect(sortedArray).toBeSortedBy('this', {descending: true})
})