var pathSum = function (root, sum) {
  if (!root) return []
  let res = []
  const dfs = (n, s, path) => {
    path.push(n.val)
    if (!n.left && !n.right && sum === s) {
      console.log(n.val, path)
      res.push(path)
    }
    if (n.left) dfs(n.left, s + n.left.val, path.slice())
    if (n.right) dfs(n.right, s + n.right.val, path.slice())
  }
  dfs(root, root.val, [])
  return res
};