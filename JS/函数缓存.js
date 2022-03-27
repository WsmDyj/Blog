// 闭包和高阶函数
function memorize(fn) {
  const cache = {}
  return function (...args) {
    let _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}

function add(a, b) {
  console.log('开始缓存')
 return a + b
}

const adder = memorize(add)

console.log(adder(2, 6))    // 输出结果: 开始缓存 8        // cache: { '[2, 6]': 8 }
console.log(adder(2, 6))    // 输出结果: 8                //cache: { '[2, 6]': 8 }
console.log(adder(10, 10))  // 输出结果: 开始缓存 20    // cache: { '[2, 6]': 8, '[10, 10]': 20 }


