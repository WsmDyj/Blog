// new
// instanceof 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
function _new() {
  // 1.创建一个对象
  let obj = new Object()
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let ret = Con.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

// promise.all()
function PromiseAll(promises) {
  let result = []
  let promiseCount = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i]
      Promise.resolve(val).then(res => {
        promiseCount++
        result[i] = res
        if (promiseCount === promises.length) {
          return resolve(result)
        }
      }, (err) => {
        return reject(err)
      })
    }
  })
}


function call(context, ...args) {
  // context 为可选参数，如果不传的话默认上下文为 window
  context = context || window
  const key = Symbol()
  // 给context新增一个独一无二的属性以免覆盖原有属性
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

function apply(context, args) {
  context = context || window
  args = args ? args : []
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

function bind(context, ...args) {
  const fn = this
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}
