/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  let len = s.length, path = [], res = [], used = new Array(len).fill(false)
  backtrack(s, res, path, len, used)
  Array.from(s).sort().reverse().join("")
  console.log(res)
  return res
}
function backtrack (s, res, path, len, used) {
  if (path.length === len) {
    res.push(path.join(''))
    return
  }
  for (let i = 0; i < len; i++) {
    if (used[i] || i > 0 && s[i] === s[i -1] && !used[i- 1]) {
      continue
    }
    path.push(s[i])
    used[i] = true
    backtrack(s, res, path, len, used)
    used[i] = false
    path.pop()
  }
}

permutation('aab')