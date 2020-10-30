/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  if (!root) return []
  let res = []
  const dfs = (n, path) => {
    path.push(n.val)
    if (!n.left && !n.right) {
      res.push(path.join('->'))
    }
    n.left && dfs(n.left, path.slice())
    n.right && dfs(n.right, path.slice())
  }
  dfs(root, [])
  return res
};