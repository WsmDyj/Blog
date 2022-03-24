/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j< nums.length; j++) {
      if (nums[i] + nums [j] == target) {
        return [i, j]
      }
    }
  }
}

/**
 * 哈希表
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum2 = function(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target-nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
}

var twoSum3 = function(nums, target) {
   nums.sort()
  const res = []
  let lo = 0, hi = nums.length - 1
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

// 11 22 33
console.log(twoSum3([1,3,1,2,2,3], 4))
