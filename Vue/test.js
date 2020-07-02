// 监听对象属性
class Observer {
  constructor(value) {
    this.value = value
    if (!value || (typeof value !== 'object')) {
      return
    } else {

      if (Array.isArray(value)) {
        value.__proto__ = arrProto
      }
      this.walk(value)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// 数组监听
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向oldArrayProperty
const arrProto = Object.create(oldArrayProperty);

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments)
  }
})

function defineReactive(obj, key, val) {
  new Observer(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return
      // 出发视图更新
      updateView()
    }
  })
}
function updateView() {
  console.log('视图更新了')
}

const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京'
  },
  num: [1, 2, 3]
}
// new Observer(data)

const proxyData = reactive(data)

function reactive(value = {}) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  // 代理配置
  const proxyConf = {
    get(target, key,receiver) {
      // 只处理非原型的属性
      let ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key)
      }
      const result = Reflect.get(target, key, receiver)
      return result
    },
    set(target, key, val, receiver) {
      // 重复的数据不处理
      const oldVal = target[key]
      if (val === oldVal) return true
      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete property', key)
      return result
    }
  }

  // 生成代理对象
  const observed = new Proxy(value, proxyConf)
  return observed
}

proxyData.name='lisi'

// 使用proxy实现观察者模式
// 观察者模式指的是函数自动观察数据对象的模式，一旦数据有变化，数据就会自动执行。

const queuedObservers = new Set()
const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(obj, {set})

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach(observe => observe())
  return result
}

const person = observable({ // 观察对象
  name: '张三',
  age: 20
})
function print() {  // 观察者
  console.log(`${person.name}, ${person.age}`)
}
observe(print)
person.name = '李四'

