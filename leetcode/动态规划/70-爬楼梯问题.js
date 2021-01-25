/**
 * @param {number} n
 * @return {number}
 */

// let dp = new Array()
// dp[0] = nums[0]
// for (let i = 1; i < nums.length; i++) {
//   dp[i] = Math.min(dp[i - 1] + nums[i], nums[i])
// }
// return Math.min(...dp)
var climbStairs = function (n) {
  if (n <= 0) return 0
  let dp = new Array()
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  console.log(dp)
  return dp[n]
}
climbStairs(2)