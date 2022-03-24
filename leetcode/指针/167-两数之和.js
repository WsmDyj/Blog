// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
// 左右指针
const twoSum = function(numbers, target) {
  let left = 0, right = numbers.length - 1
  while (left <= right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1]
    } else if (numbers[left] + numbers[right] < target) {
      left++
    } else {
      right--
    }
  }
  return [-1,-1]
};

console.log(twoSum([2,7,11,15], 9))
