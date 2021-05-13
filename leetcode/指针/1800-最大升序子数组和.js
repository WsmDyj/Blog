/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function(nums) {
  if (nums.length === 1) return nums[0]
  let slow = 0, fast = slow + 1, sum = nums[0], max = 0
  while(fast <= nums.length) {
    if (nums[fast] > nums[slow]) {
      sum += nums[fast]
      max = Math.max(sum, max)
    } else if (nums[fast] <= nums[slow]) {
      max = Math.max(sum, max)
      sum = nums[fast]
    }
    fast++
    slow++
  }
  return max
}
console.log(maxAscendingSum([5,5,6,6,6,9,1,2]))