/**
 * 快慢指针
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let slow = 0, fast = 0
  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }
  return slow + 1
}
console.log(removeDuplicates([1, 1, 2]))