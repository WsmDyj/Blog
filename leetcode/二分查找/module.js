/**
 * 模版
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

console.log(binarySearch([10, 14, 19, 26, 27, 31, 35, 42, 44], 31))