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

function deepClone(source, target) {
  if (source !== null && typeof source !== 'object') return
  for (let key of source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = Array.isArray(source[key]) ? [] : {}
     deepClone(source[key], target[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// promise.all()
function promiseAll(arr) {
  let count = 0, result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i ++) {
      let val = arr[i]
      Promise.resolve(val).then(res => {
        count++
        result[i] = res
        if (count === arr.length) {
          return resolve(result)
        }
      },(err) => {
        return reject(err)
      })
    }
  })
}

function call(context) {
  var context = context || window
  context.fn = this
  var args = []
  for (var i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i +']')
  }
  var result = eval('context.fn('+ args + ')')
  delete context.fn
  return result
}

function apply(context, arr) {
  var contenx = contenx || window
  contenx.fn = this
  var result
  if (!arr) {
    result = contenx.fn()
  } else {
    let args = []
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval(contenx.fn('+ args + '))
  }
  return result
}

function bind(context) {
  let self = this
  const args = Array.prototype.slice.call(arguments, 1)
  const FNOP = function () {}
  let fbound = function () {
    self.apply(this instanceof fbound ? this: context, args.concat(Array.prototype.slice.call(arguments)))
  }
  FNOP.prototype = this.prototype
  fbound.prototype = new FNOP()
  return fbound
}

function reduce(callback, ...args) {
  let start = 0, pre
  if (args)
}
