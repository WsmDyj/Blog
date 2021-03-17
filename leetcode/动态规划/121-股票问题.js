// 暴力解法
// function Solution(prices) {
//   let res = 0
//   for (let i = 0; i < prices.length - 1; i++) {
//     for (let j = i + 1; j < prices.length; j++) {
//       res = Math.max(res, prices[j] - prices[i])
//     }
//   }
//   return res
// }

// 贪心算法
// function Solution(prices) {
//   let low = prices[0], result = 0
//   for (let i = 0; i < prices.length; i++) {
//     low = Math.min(low, prices[i]) 
//     result = Math.max(result, prices[i] - low)
//   }
//   return result
// }

// function Solution(prices) {
//   let minPrices = prices[0], maxProfit = 0
//   for (let i = 0; i < prices.length; i++) {
//     if (prices[i] < minPrices) {
//       minPrices = prices[i]
//     } else if (prices[i] - minPrices > maxProfit) {
//       maxProfit = prices[i] - minPrices
//     }
//   }
//   return maxProfit
// }

console.log(Solution([7, 4, 5, 3, 6, 1]))