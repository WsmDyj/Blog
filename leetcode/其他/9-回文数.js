/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  let line = '' + x
  for (var i = 0, j = line.length - 1; i < j; i++, j--) {
    if (line.charAt(i) !== line.charAt(j)) {
      return false
    }
  }
  return true
}

console.log(isPalindrome(-121))