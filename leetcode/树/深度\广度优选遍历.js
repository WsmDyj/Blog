// 深度优先遍历：尽可能深的搜索树的分支
// 广度优先遍历：先访问离根节点最近的节点

/* 深度优先遍历算法口诀 dfs
*
* 1、访问根节点
* 2、对根节点的children挨个进行深度优先遍历
*/
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

const dfs = (root) => {
  console.log(root.val);
  root.children.forEach((child) => {
    dfs(child)
  });
}

// dfs(tree)


/* 广度优先遍历算法口诀 bfs
*
* 1、新建一个队列，把根节点入队
* 2、把对头出队并访问
* 3、把对头children挨个入队
* 4、重复第二、三步，直到队列为空
*/

const bfs = (root) => {
  const queue = [root]
  while (queue.length > 0) {
    const n = queue.shift()
      console.log(n.val)
      n.children.forEach(child => {
        queue.push(child)
      })
  }
}
bfs(tree)