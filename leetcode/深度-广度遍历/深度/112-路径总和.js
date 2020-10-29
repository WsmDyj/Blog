/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  if (!root) return false
  let res = false
  const dfs = (n, target) => {
    if (!n.left && !n.right && sum === target) {
      res = true
    }
    if (n.left) dfs(n.left, target + n.left.val)
    if (n.right) dfs(n.right, target + n.right.val)
  }
  dfs(root, root.val)
  return res
};