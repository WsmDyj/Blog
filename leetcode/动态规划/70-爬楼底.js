/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

// var climbStairs = function(n) {
//   if (n < 2) return 1
//   const dp = [1, 1]
//   for (let i = 2; i<=n; i++) {
//     dp[i] = dp[i-1] + dp[i-2]
//   }
//   console.log(dp)
//   return dp[n]
// }

var climbStairs = function(n) {
  if (n < 2) return 1
  let dp0 =1;
  let dp1 = 1
  for (let i = 2; i<=n; i+= 1) {
    const temp = dp0
    dp0 = dp1
    dp1 = dp1 + temp
  }
  return dp1
}


console.log(climbStairs(2))