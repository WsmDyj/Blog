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
  let len = nums.length, res = [], path = []
  if (len === 0) return res
  backtrack(nums, res, path, len)
  return res
}
function backtrack (nums, res, path, len) {
  res.push([...path])
  for (let i = 0; i < len; i ++) {
    if (path.includes(nums[i])) {
      return
    }
    path.push(nums[i])
    backtrack(nums, res, path, len)
    path.pop()
  }
}

console.log(subsets([1,2,3]))