// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
var findAnagrams = function(s, p) {
  let need = {}, window = {}, res = []
  for (a of p) {
    need[a] = (need[a] || 0) + 1
  }
  let left = 0, right =0, valid = 0
  while (right < s.length) {
    let b = s[right]
    right++
    if (need[b]) {
      window[b] = (window[b] || 0) + 1
      if (window[b] === need[b]) {
        valid++
      }
    }
    while (right - left >= p.length) {
      if (valid === Object.keys(need).length) {
        res.push(left)
      }
      let c = s[left]
      left++
      if (need[c]) {
        if (need[c] === window[c]) {
          valid--
        }
        window[c]--
      }
    }
  }
  return res
};
console.log(findAnagrams('cbaebabacd', 'abc'))
