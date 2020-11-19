
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let len = nums.length, res = [], path = []
  if (len === 0) return res
  nums.sort((x, y) => x - y)
  backtrack(nums, len, res, path, 0, 0)
  return res
}
function backtrack (nums, len, res, path, target, begin) {
  if (target === 0 && path.length === 3) {
    res.push([...path])
    return
  }
  for (let i = begin; i < len; i++) {
    if (i > begin && nums[i] === nums[i-1]) {
      continue
    }
    path.push(nums[i])
    backtrack(nums, len, res, path, target + nums[i], i + 1)
    path.pop()
  }
}
console.log(threeSum([-2, 0, 1, 1, 2]))