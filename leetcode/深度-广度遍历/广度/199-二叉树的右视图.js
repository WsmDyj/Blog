/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return []
  let que = [[root, 0]], res = []
  while (que.length) {
    const [n, l] = que.shift()
    if (!res[l]) {
      res.push([n.val])
    } else {
      res[l].push(n.val)
    }
    n.left && que.push([n.left, l + 1])
    n.right && que.push([n.right, l + 1])
  }
  console.log(res)
  return res.map(item => {
    return item[item.length - 1]
  })
};