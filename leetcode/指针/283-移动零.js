/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let p = removeElement(nums, 0)
  for (; p < nums.length; p++){
    nums[p] = 0
  }
  return nums
}
var removeElement = function(nums, val) {
  let slow = 0, fast = 0
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}
console.log(moveZeroes([0,1,0,3,12]))