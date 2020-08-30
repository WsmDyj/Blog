// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

/**
 * @param {string} s
 * @return {number}
 */

const isPalindrome = (s) => {
  let i = 0
  let j = s.length - 1
  while (i < j) {
    if (s[i] !== s[j]) return false
    i++
    j--
  }
  return true
}

var countSubstrings = function (s) {
  let count = 0
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s.substring(i, j + 1))) {
        count++
      }
    }
  }
  return count
}

