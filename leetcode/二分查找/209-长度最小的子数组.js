/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let total = target.reduce((l, t) => l + t)
  if (target > total) return 0
  let left = 0
  let right = target.length
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
  }
}
// mid个连续的有没有符合的
const calculate = (target, nums, mid) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      
    }
  }
}
console.log(minSubArrayLen(7, [2,3,1,2,4,3]))