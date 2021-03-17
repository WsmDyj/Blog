/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let len = nums.length, dp = new Array(len + 1);
  dp[0] = 0
  dp[1] = nums[0]
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1])
  }
  console.log(dp)
  return dp[len]
}

console.log(rob([2, 7, 9, 3, 1]))