function Solution(prices) {
  let minPrices = prices[0], maxProfit = 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrices) {
      minPrices = prices[i]
    } else if (prices[i] - minPrices > maxProfit) {
      maxProfit = prices[i] - minPrices
    }
  }
  return maxProfit
}
console.log(Solution([7, 1, 5, 3, 6, 4]))