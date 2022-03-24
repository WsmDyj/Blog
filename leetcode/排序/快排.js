function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = [], right = [], baseDot = Math.round(arr.length / 2), base = arr.splice(baseDot, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([base], quickSort(right))
}

console.log(quickSort([3,2,1,5,7,4]))
