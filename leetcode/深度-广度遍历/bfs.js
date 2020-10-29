const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: []
        },
        {
          val: 'g',
          children: []
        }
      ]
    }
  ]
}

// 深度优先遍历
// 使用递归
// 现将根节点访问
// 在对children 挨个访问
const dfs = (root) => {
  console.log(root.val)
  root.children.forEach((child) => {
    dfs(child)
  })
}
dfs(tree)

// 广度优先遍历
// 新建一个队列，把根节点入队
// 把队头出队并访问
// 把队头对的children 挨个入队
// 重复第二、三步，直到队列为空

const bfs = (root) => {
  const q = [root]
  while (q.length > 0) {
    const n = q.shift()
    console.log(n.val)
    n.children.forEach(child => {
      q.push(child)
    })
  }
}
bfs(tree)