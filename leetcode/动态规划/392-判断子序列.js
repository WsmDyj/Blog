var isSubsequence = function (s, t) {
  // 动态规划
  // dp[i][j] = boolean
  const sLen = s.length;
  const tLen = t.length;
  if (!sLen) return true;
  if (!tLen) return false;
  const dp = new Array(sLen + 1).fill(0).map(() => new Array(tLen + 1).fill(false));
  dp[0] = new Array(tLen+1).fill(true);
  
  for (let i = 1; i <= sLen; i++) {
    for (let j = 1; j <= tLen; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[sLen][tLen];
};

console.log(isSubsequence("abc", "ahbgdc"))