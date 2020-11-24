/**
 * @param {string} s
 * @return {string[][]}
 */
const isPalindrome = (s, start, i) => {
  while (start < i) {
    if (s[start] !== s[i]) return false
    start++
    i--
  }
  return true
}
const solution = (s) => {
  let len = s.length, res = [], path = []
  backtrack(s, 0, len, path, res,)
  return res
}
const backtrack = (s, start, len, path, res) => {
  if (start === len) {
    res.push([...path])
    return
  }
  for (let i = start; i < len; i++) {
    if (!isPalindrome(s, start, i)) {
      continue
    }
    path.push(s.substring(start, i + 1))
    backtrack(s, i + 1, len, path, res)
    path.pop()
  }
}
console.log(solution('aab'))