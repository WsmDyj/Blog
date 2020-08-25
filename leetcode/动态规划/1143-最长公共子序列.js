/*
输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace"，它的长度为 3。
*/
var longestCommonSubsequence = function (text1, text2) {
  let dp = Array.from(new Array(text1.length+1), () => new Array(text2.length+1).fill(0))
  for (let i = 1; i<=text1.length; i++) {
    for (let w= 1; w<=text2.length; w++) {
      if (text1[i-1] === text2[w-1]) {
        dp[i][w] = dp[i-1][w-1] + 1
      } else {
        dp[i][w] = Math.max(dp[i-1][w], dp[i][w-1])
      }
    }
  }
  console.log(dp)
  return dp[text1.length][text2.length]
};

console.log(longestCommonSubsequence('bl', 'yby'))