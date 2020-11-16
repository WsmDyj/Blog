/*
 * @Author: your name
 * @Date: 2020-11-16 10:24:08
 */
var deepestLeavesSum = function (root) {
  if (!root) return
  let res = 0, result = 0;
  const dfs = (n, l) => {
    if (l > res) {
      result = 0
      res = l
    }
    if (!n.left && !n.right && l >= res) {
      result += n.val
      console.log(n.val, l)
    }
    n.left && dfs(n.left, l + 1)
    n.right && dfs(n.right, l + 1)
  }
  dfs(root, 0)
  return result
};