/*
 * @Author: your name
 * @Date: 2020-10-09 14:16:52
 */
var peakIndexInMountainArray = function (arr) {
  let left = 0, right = arr.length - 1, mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (arr[mid + 1] < arr[mid]) {  // 后面的比前面的要小，递减
      right = mid - 1
    } else {  // 后面的比前面的要大, 递增
      left = mid + 1
    }
  }
  return left
};

console.log(peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19]))