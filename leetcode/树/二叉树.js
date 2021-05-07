function BinarySearchTree() {
  let Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  let root = null
  // 插入
  this.insert = function(key) {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }
  // 中序遍历
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback)
  }
  // 先序遍历
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback)
  }
  // 后序遍历
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback)
  }
  // 最小值
  this.min = function() {
    return minNode(root)
  }
  // 最大值
  this.max = function() {
    return maxNode(root)
  }
  // 搜索特定的值
  this.serach = function(key) {
    return serachNode(root, key)
  }
  // 移除一个节点
  this.remove = function(key) {
    root = removeNode(root, key)
  }
}
let tree = new BinarySearchTree()

// 移除
const removeNode = function(node, key) {
  if (node === null) {
    return null
  }
  if (key < node.key) {
    node.left = removeNode(node.left, key)
    return node
  } else if (key > node.key) {
    node.right = removeNode(node.right, key)
    return node
  } else { // 找到了值
    // 一个叶节点
    if (node.left === null && node.right === null) {
      node = null
      return node
    }
    // 只有一个子节点
    if (node.left === null) {
      node = node.right
      return node
    } else if (node.right === null) {
      node = node.left
      return node
    }

    // 两个子节点
    var aux = findMinNode(node.right)
    node.key = aux.key
    node.right = removeNode(node.right, aux.key)
    return node
  }
}
const findMinNode = function(node) {
  while(node && node.left !== null) {
    node = node.left
  }
  return node
}
// 搜素
const serachNode = function(node, key) {
  if (node === null) {
    return false
  }
  if (key < node.key) {
    return serachNode(node.left, key)
  } else if (key > node.key) {
    return serachNode(node.right, key)
  } else {
    return true
  }
}
// 新增
const insertNode = function(node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    if (node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
}
// 树的遍历：中序、先序、后序
/*
* 中序遍历
* 以上顺序访问BST所有节点的遍历方式，从小到大的顺序访问所有节点。 先访问左侧 ==> 本身节点 ==> 右侧节点
*/
const inOrderTraverseNode = function (node, callback) {
  if (node !== null ) {
    inOrderTraverseNode(node.left, callback)
    callback(node.key)
    inOrderTraverseNode(node.right, callback)
  }
}

/*
* 先序遍历
* 优于后代节点的顺序访问每个节点。先访根节点 ==> 左侧节点 ==> 右侧节点
*/
const preOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    callback(node.key)
    preOrderTraverseNode(node.left, callback)
    preOrderTraverseNode(node.right, callback)
  }
}

/*
* 后续遍历
* 先访问节点的后代节点，在访问本身。先访问左侧 ==> 右侧节点 ==> 本身节点
*/
const postOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback)
    postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}

// 最小值
const minNode = function(node) {
  if (node) {
    while(node && node.left !== null) {
      node = node.left
    }
    return node.key
  }
  return null
}

// 最大值
const maxNode = function(node) {
  if (node) {
    while(node && node.right !== null) {
      node = node.right
    }
    return node.key
  }
  return null
}

function printNode(value) {
  console.log(value)
}

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

// tree.inOrderTraverse(printNode)
// tree.preOrderTraverse(printNode)
// tree.postOrderTraverse(printNode)
// console.log(tree.min())
// console.log(tree.max())
