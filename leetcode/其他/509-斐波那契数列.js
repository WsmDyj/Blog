// 重复计算 O(2^n)
function fib(n) {
  if ( n == 0 || n ==1) return n
  if (n == 2) return 1
  return fib(n - 1) + fib(n - 2)
}

// 备忘录记录已经计算过的值
function fib1(n) {
  let map = {}
  const helper = (map, n) => {
    if (n === 0 || n === 1) return n
    if (map[n]) return map[n]
    map[n] = helper(map, n - 1) + helper(map, n - 2)
    return map[n]
  }
  return helper(map, n)
}

// 动态规划
function fib2(n) {
  if (n === 0) return 0
  let dp = []
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}

// 只要想办法存储之前的两个状态就行了
function fib3(n) {
  if (n === 0 || n ===1) {
    return n
  }
  let dp_1 = 1, dp_2 = 0
  for (let i= 2; i <= n; i++) {
    let dp = dp_1 + dp_2
    dp_2 = dp_1
    dp_1 = dp
  }
  return dp_1
}
console.log(fib3(3))
