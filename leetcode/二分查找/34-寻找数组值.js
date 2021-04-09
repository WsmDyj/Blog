/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  const left = leftSearch(nums, target)
  const right = rightSearch(nums, target)
  return [left, right]
}
const leftSearch = (nums, target) => {
  let left = 0, right = nums.length
  while (left < right) {
    let mid = Math.floor((left + (right - left) / 2))
    if (nums[mid] === target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid
    }
  }
  return nums[left] == target ? left : -1
}
const rightSearch = (nums, target) => {
  let left = 0, right = nums.length
  while (left < right) {
    let mid = Math.floor((left + (right -left) / 2))
    if (nums[mid] === target) {
      left = mid
    } else if (nums[mid] < target) {
      left = mid
    } else if (nums[mid] > target) {
      right = mid - 1
    }
  }
  return nums[right] == target ? right : -1
}
console.log(searchRange([], 0))