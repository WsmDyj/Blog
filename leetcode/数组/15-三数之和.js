/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let sortNums = nums.sort(), res = []
  for (let i = 0; i < sortNums.length; i++) {
    let left = 0, right = sortNums.length - 1, k = 0-sortNums[i]     
    while (left <= right) {
      if (sortNums[left] + sortNums[right] === k) {
        res.push([sortNums[left], sortNums[i], sortNums[right]])
      } else if (sortNums[left] + sortNums[right] < k) {
        left++
      } else if (sortNums[left] + sortNums[right] > k) {
        right--
      }
    }
  }
  return res
}
// [ -1, -1, -4, 0, 1, 2 ]
console.log(threeSum([-1,0,1,2,-1,-4]))