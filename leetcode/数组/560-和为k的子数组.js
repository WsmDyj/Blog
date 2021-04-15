// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let len = nums.length, ans = 0
  preSum = new Array(len + 1).fill(0)
  for (let i = 0; i < len; i++) {
    preSum[i+1] = preSum[i] + nums[i]
  }
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      if (preSum[i] - preSum[j] === k) {
        ans++
      }
    }
  }
  return ans
}
console.log(subarraySum([1,2,3], 3))