/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let slow = 0, fast = 0
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[slow]
      slow++
    }
    fast++
  }
  return slow
}
console.log(removeElement([0,1,2,2,3,0,4,2], 3))
