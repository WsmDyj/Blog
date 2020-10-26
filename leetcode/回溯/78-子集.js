// 用递归模拟出所有的情况
// 保证接的数字都是后面的数字

var subsets = function (nums) {
  let res = []
  const backtrack = (path, l, idx) => {
    if (path.length === l) {
      res.push(path)
      return
    }
    for (let i = idx; i< nums.length; i++) {
      backtrack(path.concat(nums[i]), l, i+1)
    }
  }
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0)
  }
  return res
};
console.log(subsets([1,2,3]))