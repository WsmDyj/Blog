/**
 * @param {string} S
 * @return {string[]}
 * toLowerCase() 小写
 * toUpperCase() 大写
 */

var letterCasePermutation = function (s) {
  let len = s.length, res = [], path = []
  if (len === 0) return []
  backtrack(s, len, res, path)
  return res
}
function backtrack (s, len, res, path) {
  res.push([...path])
  for (let i = 0; i < len; i++) {
    path.push()
  }
}

letterCasePermutation("a1b2")