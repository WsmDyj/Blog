/*
* get 方法用于拦截某个属性的读取操作
* set 方法用于拦截某个属性的附值操作
* apply 方法拦截函数的调用、call和apply的操作；接受三个参数（目标对象、目标对象的上下文对象(this)、目标对象的参数数组）
*/

var person = {
  name: '张三'
}

var proxy = new Proxy(person, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else {
      throw new ReferenceError("Property \" " + property + "\" does not exist.");
    }
  }
})

// console.log(proxy.name)  // 张三
// console.log(proxy.age)  // Property " age" does not exist.


// get 方法可以继承
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET' + propertyKey)
    return target[propertyKey]
  }
})
let obj = Object.create(proto)
// console.log(obj.name) // undefined


function createArray (...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      } 
      return Reflect.get(target, propKey, receiver)
    }
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
// console.log(arr[-2])

let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new ReferenceError('The age is not an integer')
      }
      if (value > 200) {
        throw new ReferenceError('The age seems invalid')
      }
    }
    obj[prop] = value
  }
}

let student = new Proxy({}, validator)

// console.log(student.age = 100)


// var handler = {
//   apply (target, ctx, arges) {
//     return Reflect.apply(...arguments)
//   }
// }

var target = function () {
  return 'I am the target'
}

var handle = {
  apply: function () {
    return 'I am the proxy'
  }
}

var p = new Proxy(target, handle)
// console.log(p())


// this 问题
// Proxy 代理的情况下，目标对象的内部的this 关健字会指向Proxy代理

const target2 = {
  m: function () {
    console.log(this === proxy)
  }
}

const proxy2 = new Proxy(target2, {})

// target2.m()

// proxy2.m()

const _name = new WeakMap()
class Person {
  constructor(name) {
    _name.set(this, name)
  }
  get name() {
    return _name.get(this)
  }
}

const jane = new Person('Jane')
console.log(jane.name)

const proxy3 = new Proxy(jane, {})
console.log(proxy3.name)