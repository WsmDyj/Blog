// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

var palindrome = (s, l, r) => {
  while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
    l--
    r++
  }
  return s.substring(l + 1, r)
}

var longestPalindrome = function(s) {
  let res = ''
  for (let i = 0; i < s.length; i++) {
    let s1 = palindrome(s, i , i)
    let s2 = palindrome(s, i, i + 1)
    res = res.length > s1.length ? res : s1
    res = res.length > s2.length ? res : s2
  }
  return res
};
console.log(longestPalindrome('babad'))

