
// function flattenArray(arr) {
//   return arr.toString().split(',').map(it => {
//     return +it
//   })
// }

// function flattenArray1(arr) {
//   let result = []
//   for (const item of arr) {
//     if (Array.isArray(item)) {
//       result = result.concat(flattenArray1(item))
//     } else {
//       result.push(item)
//     }
//   }
//   return result
// }

// // reduce
// function flattenArray2(arr) {
//   return arr.reduce((acc, arr) => {
//     return acc.concat(Array.isArray(arr) ? flattenArray2(arr) : arr)
//   }, [])
// }

// function flattenArray3(arr) {
//   while(arr.some(it => Array.isArray(it))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }


// console.log(flattenArray3([[0], [2, 3, 4], 1, [1, [2, 3]]]))


let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
]

const transferTree = (arr) => {
  const res = []
  const idMap = arr.reduce(
    (total, cur) =>
      Object.assign(total, { [cur.id]: { ...cur, children: [] } }),
    {}
  )
  for (const [, node] of Object.entries(idMap)) {
    if (!idMap[node.pid]) {
      res.push(node)
      continue
    }
    idMap[node.pid].children.push(node)
  }
  return res
}

// console.log(transferTree(arr))
