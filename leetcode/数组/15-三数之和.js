/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var twoSum = function(nums,start, target) {
  const res = []
  let lo = start, hi = nums.length - 1
  while (lo < hi) {
    let sum = nums[lo] + nums[hi]
    let left = nums[lo], right = nums[hi]
    if (sum < target) {
      while (lo < hi && nums[lo] === left) lo++
    }
    if (sum > target) {
      while (lo < hi && nums[hi] === right) hi--
    }
    if (sum = target) {
      res.push([nums[lo], nums[hi]])
      while (lo < hi && nums[lo] === left) lo++
      while (lo < hi && nums[hi] === right) hi--
    }
  }
  return res
}

// var threeSum = function(nums) {
//   nums.sort()
//   let res = []
//   for (let i = 0; i < nums.length; i++) {
//     const tuples = twoSum(nums, i+1, 0 - nums[i])
//     console.log(tuples)
//     for (const tuple of tuples) {
//       tuple.push(nums[i])
//       tuple && res.push(tuple)
//     }
//     while (i < nums.length && nums[i] === nums[i +1]) i++
//   }
//   return res
// }
// [ -4, -1, -1, 0, 1, 2 ]
// console.log(threeSum([-4, -1, -1, 0, 1, 2]))
console.log(twoSum([-4, -1, -1, 0, 1, 2], 1, 4))
