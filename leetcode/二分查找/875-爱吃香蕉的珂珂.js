/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
  let maxVal = 1 
  for (let i = 0; i < piles.length; i++) {
    maxVal = Math.max(maxVal, piles[i])
  }
  let left = 1 // 速度最小的时候，耗时最长
  let right = maxVal // 速度最大的时候，耗时最短
  while(left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (calculateSum(piles, mid) > h) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}
const calculateSum = (piles, mid) => {
  let totalTime = 0
  for (let i = 0; i < piles.length; i++) {
    totalTime = totalTime + Math.ceil(piles[i] / mid)
  }
  return totalTime
}

console.log(minEatingSpeed([30,11,23,4,20], 5))