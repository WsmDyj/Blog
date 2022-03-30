/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let slow = 0, fast = 0
  while (fast < nums.length) {
    if (nums[fast] != 0) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
}
console.log(moveZeroes([0,1,0,3,12]))

let timer = setTimeout(() => console.log(1), 3000)
clearTimeout(timer)

