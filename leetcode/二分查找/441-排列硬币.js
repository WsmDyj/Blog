/*
 * @Author: your name
 * @Date: 2020-10-09 14:45:04
 */
var arrangeCoins = function (n) {
  let left = 0, right = n, mid, sum;
  while(left <= right) {
    mid = Math.floor((left + right) / 2)
    sum = mid * (mid+1) / 2
    if (sum === n) {
      return mid
    } else if (sum > n) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left - 1
};
console.log(arrangeCoins(5))