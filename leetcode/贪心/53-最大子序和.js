// 贪心
const maxSubArray = (nums) => {
  let curSum = 0, maxSum = 0, res = []
  for (let i = 0; i < nums.length; i++) {
    curSum += nums[i]
    maxSum = Math.max(maxSum, curSum)
    if (curSum < 0) {
      curSum = 0
    }
  }
  return res
}

// 动态规划
// const maxSubArray = (nums) => { 
//   let dp = nums[0], result = dp
//   for (let i = 0; i < nums.length; i++) {
//     dp = Math.max(dp + nums[i], nums[i])
//     result = Math.max(result, dp)
//   }
//   return result
// }


console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))