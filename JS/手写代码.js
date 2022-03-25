// new
// 1.创建了一个空对象，
// 2.这个对象原型指向构造函数的prototype，
// 2.执行构造函数后返回这个对象，此时this会指向这个对象
function _new() {
  // 1.创建一个对象
  let obj = new Object()
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let ret = Con.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

// instanceof 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
function installOf(left, right) {
  let rightVal = right.prototype
  let leftVal = left.__proto__
  while (true) {
    if (leftVal === null) return false
    if (leftVal === rightVal) return true
    leftVal = leftVal.__proto__
  }
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

function bind(context) {
  let self = this
  const args = Array.prototype.slice.call(arguments, 1)
  const fBind = function () {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
  }
  return fBind
}

// 防抖
function debounce(func, wait, immediate) {

}
// 节流
function throttle(func, wait) {
  let context, args, timeout
  return function () {
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(function () {
        func.apply(context, args)
        timeout = null
      }, wait)
    }
  }
}
// container.onmousemove = throttle(getUserAction, 1000);

