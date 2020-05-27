// function update (val) {
//   console.log('视图更新啦～:' + val)
// }

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


class Observer {
  constructor(value) {
    this.value = value
    if (!value || (typeof value !== 'object')) {
      return
    } else {
      this.walk(value)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
// 订阅者Dep，存放观察者对象
class Dep {
  constructor() {
    this.subs = []
  }
  /*添加一个观察者对象*/
  addSub (sub) {
    this.subs.push(sub)
  }
  /*依赖收集，当存在Dep.target的时候添加观察者对象*/
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 通知所有watcher对象更新视图
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
    Dep.target = this
  }
  update () {
    console.log('视图更新啦')
  }
  /*添加一个依赖关系到Deps集合中*/
  addDep (dep) {
    dep.addSub(this)
  }
  run () {
    console.log('视图更新啦')
  }
}

function nextTick(cb, ctx) {

}

function defineReactive (obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      dep.depend() /*进行依赖收集*/
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
    new Observer(this._data) // 所有data变成可观察的
    new Watcher() // 创建一个观察者实例
    console.log('render~', this._data.test)
  }
}
let o = new Vue({
  data: {
    test: 'hello vue.'
  }
})
o._data.test = 'hello mvvm!'

Dep.target = null

for (let i = 0; i < 3; i++) {
  console.log("for中i的值：" + i)
  var time = setTimeout(() => {
    console.log("setTimeout中i的值：" + i)
  }, 300);
}
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  //第一步 传入的cb会被push进callbacks中存放起来，然后执行timerFunc（pending是一个状态标记，保证timerFunc在下一个tick之前只执行一次）
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })  
  
  if (!pending) {     //第二步
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    //第三步    
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
