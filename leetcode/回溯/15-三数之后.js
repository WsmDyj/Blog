
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  if (nums.length <= 2) return []
  let res = [], path = []
  backtrack(nums, res, 0, path)
  return res
}
function backtrack (nums, res, begin, path) {
  const sum = path.reduce((x, y) => x + y, 0)
  if (sum === 0 && path.length == 3) {
    console.log(path)
    res.push([...path])
    return
  }
  for (let i = begin; i < nums.length; i++) {
    if (i > begin && nums[i] === nums[i -1]) {
      continue
    }
    path.push(nums[i])
    backtrack(nums, res, i+1, path)
    path.pop()
  }
}
console.log(threeSum([-1,0,1,2,-1,-4]))