// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let preSum = new Map()
  preSum.set(0,1)
  let sum = 0, ans = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    let sub = sum - k
    if (preSum.has(sub)) {
      ans += preSum.get(sub)
    }
    if (!preSum.has(sum)) {
      preSum.set(sum, 1)
    } else {
      preSum.set(sum, preSum.get(sum) + 1)
    }
  }
  return ans
}
console.log(subarraySum([3,5,2,-2,4,1], 2))