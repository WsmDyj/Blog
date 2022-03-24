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

// const lengthOfLIS = (nums) => {
//   let dp = new Array(nums.length)
//   let res = 0
//   for (const num of nums) {
//     let left = 0, right = res, mid = 0
//     while (left < right) {
//       mid = Math.floor((left + right) / 2 )
//       if (dp[mid] < num) {
//         left= mid + 1
//       } else {
//         right = mid
//       }
//     }
//     dp[left] = num
//     if (res === left) res++
//   }
//   return res
// }

function lengthOfLIS(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
