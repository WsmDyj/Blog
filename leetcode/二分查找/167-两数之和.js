/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// 输入: numbers = [2, 7, 11, 15], target = 9
// 输出: [1, 2]
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    let index1 = numbers[i], index2 = target - index1,
      left = i + 1, right = numbers.length - 1, mid;
    while (left <= right) {
      mid = Math.floor((right + left) / 2)
      if (numbers[mid] === index2) {
        return [i + 1, mid + 1]
      } else if (numbers[mid] < index2) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return [-1, -1]
}
console.log(twoSum([12, 13, 23, 28, 43, 44, 59, 60, 61, 68, 70, 86, 88, 92, 124, 125, 136, 168, 173, 173, 180, 199, 212, 221, 227, 230, 277, 282, 306, 314, 316, 321, 325, 328, 336, 337, 363, 365, 368, 370, 370, 371, 375, 384, 387, 394, 400, 404, 414, 422, 422, 427, 430, 435, 457, 493, 506, 527, 531, 538, 541, 546, 568, 583, 585, 587, 650, 652, 677, 691, 730, 737, 740, 751, 755, 764, 778, 783, 785, 789, 794, 803, 809, 815, 847, 858, 863, 863, 874, 887, 896, 916, 920, 926, 927, 930, 933, 957, 981, 997], 542))