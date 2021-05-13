// 递归模拟出所有的情况
// 遇到包含重复元素的情况就回溯
// 收集所有到达递归终点的额情况，并返回


const permute = (nums) => {
  let res = [], path = [], deep = 0
  dfs(nums, res, path, deep)
  return res
}

const dfs = (nums, res, path, deep) => {
  if (deep === nums.length) {
    res.push([...path])
  }
  for (let i = 0; i < nums.length; i++) {
    if (path.includes(nums[i])) {
      continue
    }
    path.push(nums[i])
    dfs(nums, res, path, deep + 1 )
    path.pop()
  }
}


console.log(permute([1,2,3]))