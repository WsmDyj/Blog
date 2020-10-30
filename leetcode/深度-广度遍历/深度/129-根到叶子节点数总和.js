/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  if (!root) return []
  let res = [], sum = 0;
  const bfs = (n, path) => {
    path.push(n.val)
    if (!n.left && !n.right) {
      res.push(path)
    }
    n.left && bfs(n.left, path.slice())
    n.right && bfs(n.right, path.slice())
  }
  bfs(root, [])
  res.forEach(item => {
    sum = sum + Number(item.join(''))
  })
  console.log(sum)
  return sum
};