// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

// var lengthOfLIS = function (nums) {
//   let dp = new Array(nums.length).fill(1)
//   let res = 0
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < i; j++) {
//       if (nums[i] > nums[j]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//     res = Math.max(res, dp[i])
//   }
//   return res
// }

const lengthOfLIS = (nums) => {
  let dp = new Array(nums.length).fill(0), res = 0
  for (const num of nums) {
    let left = 0, right = res, mid = 0
    while (left < right) {
      mid = Math.floor((left + right) / 2)
      if (dp[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    dp[left] = num
    if (res === left) res++
  }
  return res
}


console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
