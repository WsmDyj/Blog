// 递归模拟出所有的情况
// 遇到包含重复元素的情况就回溯
// 收集所有到达递归终点的额情况，并返回

var permute = function (nums) { 
  let res = []
  const backtrack = (path) => {
    if (path.length === nums.length) {
      res.push(path)
      return
    }
    nums.forEach(n => {
      if (path.includes(n)) {
        return
      }
      backtrack(path.concat(n))
    })
  }
  backtrack([])
  return res
}



console.log(permute([1,1,2]))