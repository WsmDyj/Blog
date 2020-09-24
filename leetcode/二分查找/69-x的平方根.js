var mySqrt = function(x) {
  if (x === 0 || x === 1) {
    return x
  }
  let left = 1, right = x, mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (mid * mid > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return right
}

console.log(mySqrt(10))