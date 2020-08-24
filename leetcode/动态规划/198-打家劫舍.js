// f(k) = max(f(k-2) + ak, f(k-1)), 
var rob = function (nums) {
  if (nums === 0) return 0
  const dp = [0, nums[0]]
  for (let i = 2; i<= nums.length; i++) {
    dp[i] = Math.max(dp[i-2]+nums[i-1], dp[i-1]) 
  }
  console.log(dp)
  return dp[dp.length-1]
};

// console.log(rob([2, 7, 9, 3,1]))
