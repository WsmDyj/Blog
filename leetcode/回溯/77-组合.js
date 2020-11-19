/*
 * @Author: wusimin7
 * @Date: 2020-11-19 09:32:12
 * @Description: 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @Parms: n = 4, k = 2
 */
var combine = function (n, k) {
  let nums = Array.from(new Array(n + 1).keys()).slice(1), res = [], path = []
  if (n < 1) return res
  backtrack(nums, path, res, k, nums.length, 0)
  return res

}
function backtrack (nums, path, res, k, len, begin) {
  if (path.length === k) {
    res.push([...path])
    return
  }
  for (let i = begin; i < len; i++) {
    path.push(nums[i])
    backtrack(nums, path, res, k, len, i+1)
    path.pop()
  }
}
console.log(combine(4, 2))