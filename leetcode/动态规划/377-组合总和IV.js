/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {

  let len = nums.length, dp = new Array(target + 1)
  dp[0] = 1
  for (let i = 1; i < target; i++) {
    dp[i] = dp[i - nums]
  }
}

console.log(combinationSum4([1, 2, 3], 4))