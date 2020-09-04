//广度优先遍历整棵树，并记录每个节点的层级
//遇到叶子节点，返回节点层级，并返回
// var minDepth = function (root) {
//   if (root == null) return 0;
//   if (root.left && root.right) {
//     return 1 + Math.min(minDepth(root.left), minDepth(root.right));
//   } else if (root.left) {
//     return 1 + minDepth(root.left);
//   } else if (root.right) {
//     return 1 + minDepth(root.right);
//   } else {
//     return 1;
//   }
// };

var minDepth = function (root) {
  if (root == null) return 0;
  const queu = [[root, 1]]
  while (queu.length > 0) {
    const [n, l] = queu.shift()
    if (!n.left && !n.right) return l
    if (n.left) queu.push([n.left, l + 1])
    if (n.right) queu.push([n.right, l + 1])
  }
}