/**
输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

// 首先对数组进行遍历，当前连续最小子序列和为sum，结果为ans
// 如果sum < 0,则说明对结果有益，sum保留并加上当前遍历数字
// 如果sum > 0， 则说明对结果有害，sum保留
// 每次比较 sum 和 ans的大小，将最小值置为ans，遍历结束返回结果
var maxSubArray = function (nums) {
  let dp = new Array()
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.min(dp[i-1] + nums[i], nums[i])
  }
  return Math.min(...dp)
}
console.log(maxSubArray([1,-2,3,4,-5,-6,-7]))
