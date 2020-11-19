/*
 * @Author: wusimin7
 * @Date: 2020-11-19 09:32:12
 * @Description: 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @Parms: n = 4, k = 2
 */
var combine = function (n, k) {
  // 1 2 3 4 所有的组合
  if (k <= 0 || n < k) return
  let nums = Array.from(new Array(n + 1).keys()).slice(1)
  let len = nums.length, res = []
  const backtrack = (depth, index, path) => {
    if (depth == k) {
      console.log(path)
      res.push([...path])
    }
    for (let i = index; i < len; i++) {
      if (path.includes(nums[i])) {
        continue
      }
      path.push(nums[i])
      backtrack(depth + 1, i + 1, path)
      path.pop()
    }
  }
  backtrack(0, 0, [])
  return res
}
combine(4, 2)