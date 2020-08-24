var minCostClimbingStairs = function (cost) {
  let dp = [cost[0], cost[1]]
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i], dp[i - 2])
  }
  return dp[cost.length - 1]
};

console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))