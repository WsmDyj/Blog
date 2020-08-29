// 获取左右子数   --- 分
// 递归翻转左右子数  --- 解
// 将翻转后的左右子树换个位置放到根节点

var invertTree = function (root) {
  if (!root) { return null }
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  }
};