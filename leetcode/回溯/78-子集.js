// 用递归模拟出所有的情况
// 保证接的数字都是后面的数

// 方法一
// var subsets = function (nums) {
//   let res = []
//   const backtrack = (path, l, idx) => {
//     if (path.length === l) {
//       res.push(path)
//       return
//     }
//     for (let i = idx; i < nums.length; i++) {
//       backtrack(path.concat(nums[i]), l, i+1)
//     }
//   }
//   for (let i = 0; i <= nums.length; i++) {
//     backtrack([], i, 0)
//   }
//   return res
// };

// 方法二
const subsets = (nums) => {
  const res = []
  const dfs = (index, list) => {
    res.push(list.slice())
    for (let i = index; i < nums.length; i++) {
      list.push(nums[i])
      dfs(i+1, list)
      list.pop()
    }
  }
  dfs(0, [])
  return res
}
console.log(subsets([1,2,3]))