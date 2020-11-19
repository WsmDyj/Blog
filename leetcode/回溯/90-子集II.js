/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let len = nums.length, res = [], path = []
  if (len === 0) return res
  nums.sort((x, y) => x - y)
  let used = new Array(len).fill(false)
  backtrack(nums, res, path, len, used, 0)
  console.log(res)
  return res
};

function backtrack (nums, res, path, len, used, begin) {
  res.push([...path])
  for (let i = begin; i < len; i++) {
    if (used[i] || (i > 0 && !used[i - 1] && nums[i - 1] == nums[i])) {
      continue
    }
    path.push(nums[i])
    used[i] = true
    backtrack(nums, res, path, len, used, i + 1)
    used[i] = false
    path.pop()
  }
}

subsetsWithDup([4, 4, 4, 1, 4])