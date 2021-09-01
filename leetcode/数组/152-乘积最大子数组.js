// 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

// 输入: [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let res = [], path = []
  if (nums.length <= 0) return res
  backtrack1(nums, res, path)
  return res
};

function backtrack1(nums, res, path) {
  res.push([...path])
  for (let i = 0; i < nums.length; i++) {
    if (path.includes(nums[i])) {
      return 
    }
    path.push(nums[i])
    backtrack1(nums, res, path)
    path.pop()
  }
}

console.log(maxProduct([2, 3, -2, 4]))