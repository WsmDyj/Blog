var maxDepth = function (root) {
  let count = 0
  const dfs = (n, l) => {
    if (!n) return
    count = Math.max(count, l)
    dfs(n.left, l + 1)
    dfs(n.right, l + 1)
  }
  dfs(root, 1)
  return count
};