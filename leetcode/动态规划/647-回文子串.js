/**
 * 输入："aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 */

var countSubstrings = function (s) {
  let len = s.length
  let dp = Array.from(new Array(len), () => new Array(len).fill(0))
  for (let i = 0; i < len; i++) {
    dp[i][i] = 1
    for (let j= i; j > 0; j--) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }
  console.log(dp)
}

console.log(countSubstrings('adaa'))