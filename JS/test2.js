function exchange(arr) {
  let left = 0, right = arr.length - 1, temp = ''
  while (left < right) {
    while (left < right && arr[left] % 2 === 1) left++
    while (left < right && arr[right] % 2 === 0) right--
    temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
  }
  return arr
}

console.log(exchange([1,2,3,4,6,7]))
