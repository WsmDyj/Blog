// 新建一个变量，记录最大深度
// 深度遍历整课树，并记录每个节点的层级，同时不断刷新最大深度这个变量
// 返回变量

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