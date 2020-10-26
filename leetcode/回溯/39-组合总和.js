var combinationSum = function (candidates, target) {
  let res = []
  const backtrack = (path) => {
    console.log(path)
    candidates.forEach(n => {
      backtrack(path.concat(n))
    })
  }
  backtrack(target, [], 0)
  return res
}

console.log(combinationSum([2,3,6,7], 7))