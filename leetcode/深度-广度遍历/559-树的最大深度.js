var maxDepth = function (root) {
  let res = 0
  const dfs = (n, l) => {
    if (!n) return
    res = Math.max(res, l)
    n.children.forEach(child => {
      dfs(child, l + 1)
    })
  }
  dfs(root, 1)
  return res
};