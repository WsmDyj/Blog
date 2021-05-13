// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// reduce 接受四个参数
// acc(累计器)、cur(当前值)、idx(当前索引)、src(源数组)

const array = [1, 2, 3, 4]
const array1 = [{x: 1}, {x:2}, {x:3}]
const array2 = [[0, 1], [2, 3], [4, 5]]
const array3 = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
const array4 = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']

console.log(array.reduce((acc, next) => acc + next, 4))

console.log(array1.reduce((acc, next) => acc + next.x, 0))

console.log(array2.reduce((acc, next) => acc.concat(next), []))

console.log(array3.reduce((acc, next) => {
  if (next in acc) {
    acc[next]++
  } else {
    acc[next] = 1
  }
  return acc
}, {}))

console.log(array4.reduce((acc, cur) => {
  if (acc.indexOf(cur) === -1) {
    acc.push(cur)
  }
  return acc
}, []))
