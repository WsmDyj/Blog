/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let countL = 0, countR = 0, diff = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') {
      countR++
    } else {
      countL++
    }
    if (countR === countL) {
      diff++
    }
  }
  return diff
};
