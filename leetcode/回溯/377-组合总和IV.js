/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let len = nums.length, res = [], path = []
  if (len === 0) return 0
  backtrack(nums, res, path, target, len)
  console.log(res)
  return res.length
}
function backtrack (nums, res, path, target, len) {
  if (target === 0) {
    res.push([...path])
    return
  }
  for (let i = 0; i < len; i++) {
    if (target - nums[i] < 0) {
      continue
    }
    path.push(nums[i])
    backtrack(nums, res, path, target - nums[i], len)
    path.pop()
  }
}

combinationSum4([3,1,2,4], 4)