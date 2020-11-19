var combinationSum = function (candidates, target) {
  let len = candidates.length, res =[], path = []
  if (len === 0) return res
  candidates.sort((x, y) => { x - y })
  dfs(candidates, 0, len, target, path, res)
  return res
}

function dfs (candidates, begin, len, target, path, res) {
  if (target === 0) {
    res.push([...path])
    return
  }
  for (let i = begin; i < len; i++) {
    if (target - candidates[i] < 0) {
      continue
    }
    path.push(candidates[i])
    dfs(candidates, i, len, target - candidates[i], path, res)
    path.pop()
  }
}

console.log(combinationSum([2,3,6,7], 7))