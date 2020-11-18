// 递归模拟出所有的情况
// 遇到包含重复元素的情况就回溯
// 收集所有到达递归终点的额情况，并返回

// var permute = function (nums) { 
//   let res = []
//   backtrack([])
//   function backtrack(path) {
//     if (path.length === nums.length) {
//       res.push([...path])
//       return
//     }
//     for (let i = 0; i< nums.length; i++) {
//       if (path.includes(nums[i])) {
//         continue
//       }
//       path.push(nums[i])
//       backtrack(path)
//       path.pop()
//     }
//   }
//   return res
// }

const permute = (nums) => {
  let len = nums.length, res = [], path = []
  if (len === 0) return
  dfs(nums, len, 0, path, res)
  return res
}

function dfs (nums, len, depth, path, res) {
  if (depth === len) {
    res.push([...path])
    return
  }
  for (let i = 0; i < len; i++) {
    if (path.includes(nums[i])) {
      continue
    }
    path.push(nums[i])
    dfs(nums, len, depth+1, path, res)
    path.pop();
  }
}

console.log(permute([1,2,3]))