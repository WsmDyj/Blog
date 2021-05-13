/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
  nums.sort(function (a, b) {
    return b - a
  })
  let bucket = new Array(k).fill(0)
  const sum = nums.reduce((prev, next) => prev + next, 0)
  let target = sum / k
  // 排除一些基本情况
  if (k > nums.length) return false
  if (sum % k != 0) return false
  return backtrack(nums, 0, target, bucket)
}
const backtrack = (nums, index, target, bucket) => {
  if (index === nums.length) {
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== target) return false
    }
    return true
  }
  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i] +nums[index] > target) {
      continue
    }
    bucket[i] += nums[index]
    if (backtrack(nums, index + 1, target, bucket)) {
      return true
    }
    bucket[i] -= nums[index]
  }
  return false
}
console.log(canPartitionKSubsets([2,2,2,2,2,2,2,2,2,2,2,2,2,3,3], 8))