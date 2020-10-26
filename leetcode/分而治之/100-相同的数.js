// 分-- 获取两个树的左子树和右子数
// 解--  递归的判断两个数的左子树、右子数是否相同，
// 合-- 将上述结果合并，如果根节点的值也相同，树就相同

var isSameTree = function (p, q) {
  if (p == null && q == null) {
    return true;
  } else if (p == null || q == null) {
    return false;
  } else if (p.val != q.val) {
    return false;
  } else {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
};