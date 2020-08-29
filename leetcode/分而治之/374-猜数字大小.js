var guessNumber = function (n) {
  let rec= (low, high) => {
    const mid = Math.floor((low + high) /2)
    const res = guess(mid)
    if (res === 0) {
      return mid
    } else if (res === 1) {
      return rec(mid + 1, high)
    } else {
      return rec(1, mid - 1)
    }
  }
  return rec(1, n)
};