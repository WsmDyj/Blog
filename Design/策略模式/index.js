const array = [1, 2, 3, 4]

const reducer = (prev, curr) => prev + curr

console.log(array.reduce(reducer))

// 累加对象数组里的值
var initialValue = 0
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce((prev, curr) => prev + curr.x, initialValue)
console.log(sum)

// 将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => { return a.concat(b)})
console.log(flattened)

// 计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

var countedNames = names.reduce(function (allNames, name, idx) {
  if (name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1
  }
  return allNames
}, {})
console.log(countedNames)

// 按属性对object分类
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]
function groupBy (objectarray, property) {
  return objectarray.reduce(function (acc, obj) {
    var key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}
var groupedPeople = groupBy(people, 'age')
console.log(groupedPeople)

// 数组去重
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, [])
console.log(result)


let products = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]
let combine = function (...chunks) {
  let res = []
  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    console.log(chunk)
    let isLast = chunkIndex === chunks.length - 1
    for (let val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }
  helper(0, [])
  return res
}
combine(products, colors, storages)