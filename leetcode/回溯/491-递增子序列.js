/**
 * @param {number[]} nums
 * @description
 * 输入：[4, 6, 7, 7]
  输出：[[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
 * @return {number[][]}
 */
var findSubsequences = function(nums) {
  let res = [], path = [], set = new Set()
  if (nums.length <=0) return []
  backtrack(nums, res, path,set, 0)
  return res
}
const backtrack = (nums, res, path,set, bengin) => {
  if (path.length >= 2) {
    const str = path.toString()
    if (!set.has(str)) {
      res.push([...path])
      set.add(str)
    }
  }
  for (let i = bengin; i < nums.length; i++) {
    const prev = path[path.length - 1]
    const next = nums[i]
    if (path.length === 0 || prev <= next) {
      path.push(next)
      backtrack(nums, res, path,set, i + 1)
      path.pop()
    }
  }
}
console.log(findSubsequences([4,6,7,7]))