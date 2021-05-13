
/*
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
*/
var combine = function (n, k) {
  let nums = Array.from(new Array(n + 1).keys()).slice(1), res = [], path = []
  if (n < 1) return res
  backtrack(nums, res, path, k)
  return res
}
function backtrack (nums, res, path, k, bengin) {
  if (path.length===k) {
    res.push([...path])
    return
  }
  for (let i = bengin; i < nums.length; i++) {
    path.push(nums[i])
    backtrack(nums, res, path, k, i+1)
    path.pop()
  }
}
console.log(combine(3, 3))