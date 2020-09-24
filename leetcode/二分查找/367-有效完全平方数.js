/**
 * @param {number} num
 * @return {boolean}
 */
// 输入：16
// 输出：True

var isPerfectSquare = function (num) {
  if (num < 2) return true
  let left = 1, right = num, mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (mid * mid == num) {
      return true
    } else if (mid * mid > num) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return false
}

console.log(isPerfectSquare(104976))