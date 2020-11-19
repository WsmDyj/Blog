/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let len = candidates.length, res = [], path = [];
  candidates.sort((x, y) => x - y);
  if (len === 0) return res
  backtrack(candidates, len, target, res, path, 0)
  return res
}
function backtrack (candidates, len, target, res, path, begin) {
  if (target === 0) {
    res.push([...path])
    return
  }
  for (let i = begin; i < len; i++) {
    if (i > begin && candidates[i] == candidates[i - 1]) {
      continue
    }
    path.push(candidates[i])
    backtrack(candidates, len, target - candidates[i], res, path, i + 1)
    path.pop()
  }
}
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))