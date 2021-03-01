/**
 * @param {number} n
 * @return {number}
 */
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


var waysToStep = function (n) {
  if (n <= 0) return 0
  let dp = new Array()
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  dp[3] = 4
  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
  } 
  return dp[n]
}
console.log(waysToStep(5))