// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3

const lengthOfLongestSubstring = function(s) {
  let left = 0, right = 0, window = {}, res = 0
  while (right < s.length) {
    let c = s[right]
    window[c] = (window[c] || 0) + 1
    right++
    while (window[c] > 1) {
      let d = s[left]
      left++
      if (window[d]) {
        window[d]--
      }
    }
    res = Math.max(res, right -left)
  }
  return res
};

console.log(lengthOfLongestSubstring('abcbacbb'))
