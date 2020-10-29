/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  let q = [[root, 0]], res = [];
  while (q.length) {
    const [n, l] = q.shift()
    if (!res[l]) {
      res.push([n.val])
    } else {
      res[l].push(n.val)
    }
    if (n.left) q.push([n.left, l + 1])
    if (n.right) q.push([n.right, l + 1])
  }
  return res
};