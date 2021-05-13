/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  const sum = nums.reduce((acc, cur) => acc + cur)
  let leftSum = 0
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === sum - leftSum - nums[i]) {
      return i
    }
    leftSum += nums[i]
  }
}
console.log(pivotIndex([1, 7, 3, 6, 5, 6]))