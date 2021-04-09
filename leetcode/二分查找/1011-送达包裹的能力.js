/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
  let left = Math.max(...weights) // 载重可能的最小值
  let right = weights.reduce((l, r) => l + r) // 载重可能的最大值
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (calculate(weights, mid, D)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return right
}
// 计算装mid值能否在D天完成
const calculate = (weights, mid, D) => {
  let cur = mid
  for (let i = 0; i < weights.length; i++) {
    if (cur < weights[i]) {
      cur = mid
      D--
    }
    cur -= weights[i]
  }
  return D > 0
}
console.log(shipWithinDays([1,2,3,1,1], 4))
