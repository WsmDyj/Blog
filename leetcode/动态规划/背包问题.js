// 背包问题

/**
 * 考虑装与不装最后一个物品
 * if (装最后一个) {
 *  if（最后一个物品的容量是否小于maxValue） {
 *     算出 n-1 能装剩余容量的最大价值
 *    sum（求和）
 *  } else {
 *    不装
 *  }
 * } else {
 *  前n个物品的最大价值
 * }
 * 
 * return Math.max(装与不装的价值)
 */

 // 二位数组[[],[]],每个代表的是一行

//  var values = [3, 4, 5] // 价值
//  var weights = [2, 3, 4]  // 重量
//  var capactiy = 5  // 背包容量
//  var n = values.length

// function knapSack(capactiy, weights, values, n) {
//   let i, w, a, b;
//   let ks = Array.from(new Array(n + 1), () => new Array(capactiy + 1))
//   console.log(ks)
//   for (i = 0; i<=n; i++) {
//     for (w = 0; w <= capactiy; w++) {
//       if (i === 0 || w===0) {
//         ks[i][w] = 0
//       } else if (weights[i - 1] <= w) {
//         a = values[i -1] + ks[i-1][w-weights[i-1]]
//         b = ks[i-1][w]
//         ks[i][w] = Math.max(a, b)
//       } else {
//         ks[i][w] = ks[i -1][w]
//       }
//     }
//   }
//   findValues(n, capactiy, weights, values, ks)
//   return ks[n][capactiy]
// }

// function findValues(n, capactiy, weights, values, ks) {
//   var i = n, k = capactiy;
//   while (i>0 && k > 0) {
//     if (ks[i][k] !== ks[i-1][k]) {
//       console.log('物品' + i + ',' + '重量' + weights[i - 1] + ',' + '价值' + values[i - 1])
//       i--;
//       k = k - ks[i][k];
//     } else {
//       i--
//     }
//   }
// }
// console.log(knapSack(capactiy, weights, values, n,))


/**
 * 如果选了最后一个
 * if (最后一个valus > )
 */




var value = [1, 3, 4] // 价值
var weight = [15, 20, 30]  // 重量
var bagWeight = 4  // 背包容量
function knapSack (bagWeight, weight, value) { 
  let len = value.length
  dp = Array.from(new Array(len + 1), () => new Array(bagWeight + 1))
  console.log(dp)
  
}
console.log(knapSack(bagWeight, weight, value))