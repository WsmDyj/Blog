/**
 * 最多出现两次
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicate = function (nums) {
  let slow = 0, fast = 1, count = 0
  while (fast < nums.length) {
    if (nums[slow] === nums[fast]) {
      count++
    } else {
      count = 0
    }
    if (count <= 1) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }
  return nums.splice(0, slow + 1)
}

console.log(removeDuplicate([1, 1]))