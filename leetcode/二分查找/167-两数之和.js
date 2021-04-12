/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// 输入: numbers = [2, 7, 11, 15], target = 9
// 输出: [1, 2]
var twoSum = function (numbers, target) {
  let left = 0, right = numbers.length -1
  while (left <= right) {
    let sum = numbers[left] + numbers[right]
    if (sum === target) {
      return [left+1, right+1]
    } else if (sum > target) {
      right--
    } else if (sum < target){
      left++
    }
  }
  return [-1,-1]
}
console.log(twoSum([2,7,11,15], 9))