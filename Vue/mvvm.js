// function update (val) {
//   console.log('视图更新啦～:' + val)
// }

function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

// function defineReactive (obj, key, val) {
//   observer(val)
//   Object.defineProperty(obj, key, {
//     enumerable: true, // 可枚举
//     configurable: true, // 可修改或删除
//     get: function reactiveGetter () {
//       return val
//     },
//     set: function reactiveSetter (newVal) {
//       if (newVal === val) return
//       update(newVal)
//     }
//   })
// }

// class Vue {
//   constructor(options) {
//     this._data = options.data
//     observer(this._data)
//   }
// }

// let o = new Vue({
//   data: {
//     test: 'I am test.'
//   }
// })

// o._data.test = 'hello mvvm!'



// 订阅者Dep，存放观察者对象
class Dep {
  constructor() {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  // 通知所有watcher对象更新视图
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

class Watcher {
  constructor () {
    // 在new 一个watcher对象是将给对象赋值给Dep.target, 在get会用到
    Dep.target = this
  }
  update () {
    console.log('视图更新啦')
  }
}

Dep.target = null

function defineReactive (obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      dep.addSub(Dep.target)
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      dep.notify()
    }
  })
}

class Vue {
  constructor (options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    console.log('render~', this._data.test)
  }
}

let o = new Vue({
  data: {
    test: 'I am test.'
  }
})

o._data.test = 'hello mvvm!'