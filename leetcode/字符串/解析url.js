// [1,2,1,4,5,4,3,4,3,3,3] -> [1,4,3]

function shuanfa(arr) {
  return new Set(arr)
}

console.log(shuanfa([1, 2, 1, 4, 5, 4, 3, 4, 3, 3, 3]))