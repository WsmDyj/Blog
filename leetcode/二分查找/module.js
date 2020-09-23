/**
 * 模版
 * 1、审题：将题目中一些边界情况、特殊要求都仔细阅读
 * 2、所有的解法都思考一遍，最后得出最优解法
 * 3、写代码
 * 4、测试的用例
 */

// let left = 0, right = array.length - 1;

// while (left <= right) {
//   mid = Math.floor((left + right) / 2)
//   if (array[mid] === target) {
//     return mid
//   } else if (array[mid] < target) {
//     left = mid + 1
//   } else if (array[mid] > target) {
//     right = mid - 1
//   }
// }

// [10, 14, 19, 26, 27, 31, 35, 42, 44] 
function binarySearch(array, target) {
  let left = 0, right = array.length - 1, mid;
  while(left <= right) {
    mid = Math.floor((left + right) / 2)
    if (array[mid] < target) {
      left = mid + 1
    } else if (array[mid] > target) {
      right = mid -1
    } else {
      return mid
    }
  }
}

console.log(binarySearch([-1, 0], 0))