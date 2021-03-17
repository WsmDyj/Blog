// Object对象本质是键值对的集合（hash结构），但是只能用字符串作为键
// Map 任何类型都能作为键。 键是内存地址的绑定，只要内存地址不一样，也会设为不同的键

const m = new Map()
const o = {p: 'hello world'}
m.set(o, 'content')
m.get(o) // content

m.has(o) // true
m.delete(o)

// Map也可以接受一个数组作为参数
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
])
map.get('name') // 张三

// const times = [
//   ['name', '张三'],
//   ['title', 'Author']
// ]
// times.forEach(([key, value]) => map.set(key, value))


/**
* size()
* set(key, value)
* get(key)
* has(key)
* delete(key)
* clear() 清除所有的成员没有返回值
*/

/**
 * 遍历方法
 * key(): 返回键名的遍历器
 * values(): 返回键值遍历器
 * entries(): 返回所有成员的遍历器
 * forEach(): 遍历所有的成员
 */
const map1 = new Map([
  ['F', 'no'],
  ['T', 'yes']
])
for (let [key, value] of map1.entries()) {
  // console.log(key, value)
}

const map2 = new Map([
  ['1', 'a'],
  ['2', 'b'],
  ['3', 'c'],
])
const map3 = new Map(
  [...map2].filter(([k, v]) => k < 3)
)
map3.forEach((value, key) => {
  console.log("key: %s, value: %s", key, value)
})


// Map转换为对象
function strMapToObj (strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}
console.log(strMapToObj(map3))