/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let nums = Array.from(new Array(10).keys()).slice(1), res = [], path = []
  backtrack(nums, res, path, n, k, nums.length, 0, 0)
  console.log(res)
  return res
};
function backtrack (nums, res, path, n, k, len, target, begin) {
  if (target === n && path.length == k) {
    res.push([...path])
    return
  }
  for (let i = begin; i < len; i++) {
    if (begin > i) {
      continue
    }
    path.push(nums[i])
    backtrack(nums, res, path, n, k, len, target + nums[i], i + 1)
    path.pop()
  }
}

combinationSum3(3, 9)