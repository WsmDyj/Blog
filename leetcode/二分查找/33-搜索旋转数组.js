// 输入: nums = [4,5,6,7,0,1,2], target = 0
// 输出: 4
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0, right = nums.length - 1, mid;
  while(left < right) {
    mid = Math.floor((left + right) / 2)
    if (nums[0] <= nums[mid] && (target > nums[mid] || target < nums[0])) {
      left = mid + 1
    } else if (target > nums[mid] && target < nums[0]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left == right && nums[left] == target ? left : -1
}
// console.log(search([4, 5, 6, 7, 0, 1, 2], 0))


// 旋转数组的最小数字
