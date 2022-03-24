// 给你一个整数数组nums 和一个整数k ，
// 判断数组中是否存在两个 不同的索i和j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k, t) {
  
  return false
};

// let map = new Map()
// for (let i = 0; i < nums.length; i++) {
//   const num = nums[i]
//   if (map.has(num) && i - map.get(num) <= k) {
//     return true
//   }
//   map.set(num, i)
// }
// return false

console.log(containsNearbyDuplicate([1,2,3,1], 3, 0))

function findMIn(arr) {
  let min1 = Infinity
  let min2 = min1
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (item < min1) {
      min2 = min1
      min1 = item
    } else if (item < min2) {
      min2 = item
    }
  }
  console.log(min1, min2)
}
findMIn([2,6,7,4,10,3,5])
