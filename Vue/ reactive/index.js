let activeEffect  // 全局变量存储被注册的副作用函数
const effectStack = [] // effect 栈

function effect(fn, options) { // effect 函数用于注册副作用函数
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    // 在调用副作用之前将副作用函数压入栈中
    effectStack.push(effectFn)
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length -1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options?.lazy) {
    effectFn()
  }
  return effectFn
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

const bucket = new WeakMap()

const data = {
  foo: 1,
}

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
}

function trigger(target, key, type) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const iterateEffects = depsMap.get(ITERATE_KEY)
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  if (type === TriggerType.ADD && type === TriggerType.DELETE) {
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }
  effectsToRun.forEach(effectFn => {
    if (effectFn.options?.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

const ITERATE_KEY = Symbol()

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === 'raw') {
        return target
      }
      const res = Reflect.get(target, key, receiver)
      if (isShallow) {
        return res
      }
      if (!isReadonly) {
        track(target, key)
      }
      if (typeof res === 'object' && res !== null) {
        return isReadonly ? readonly(res) : reactive(res)
      }
      return res
    },
    set(target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读信息`)
        return true
      }
      const oldVal = target[key]
      const type = Object.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, newVal, receiver)
      // target == receiver.raw 说明receiver就是target的代理对象
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type)
        }
      }
      return res
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    ownKeys(target) {
      track(target, ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读信息`)
        return true
      }
      const hadKey = Object.hasOwnProperty.call(target, key)
      const res = Reflect.deleteProperty(target, key)
      if (res && hadKey) {
        trigger(target, key, 'DELETE')
      }
      return res
    }
  })
}

function reactive(obj) {
  return createReactive(obj)
}
function shallowReactive(obj) {
  return createReactive(obj, true)
}
function readonly(obj) {
  return createReactive(obj, false, true)
}

// 定义一个任务队列
const jobQueue = new Set()
// 建给一个任务添加到微任务队列
const p = Promise.resolve()
// 一个标志代表是否正在刷行队列
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

function computed(getter) {
  // 缓存上一次计算的值
  let value
  // 是否需要重新计算
  let dirty = true
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: function() {
      if (!dirty) {
        dirty = true
        trigger(obj, 'value')
      }
    }
  })
  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, 'value')
      return value
    }
  }
  return obj
}
// computed(() => obj.foo + obj.bar)

function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse()
  }
  let oldValue, newValue
  // 用来存储用户注册的过期回调
  let cleanup
  // 定义 onInvalidate
  function onInvalidate(fn) {
    cleanup = fn
  }
  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate())
    oldValue = newValue
  }
  const effectFn =
    effect(
      () => getter(),
      {
        lazy: true,
        scheduler: () => {
          if (options.flush === 'post') {
            const p = Promise.resolve()
            p.then(job)
          } else {
            job()
          }
        }
      })
  if (options.immediate) {
    job()
  } else  {
    oldValue = effectFn()
  }
}

function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value == null || seen.has(value)) return
  seen.add(value)
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}

watch(
  // () => obj.foo,
  (newValue, oldValue) => {
    // console.log(newValue, oldValue)
  },
  {
    immediate: true
  }
)

// const sumRes = computed(() => obj.foo + obj.bar)
//
// effect(() => {
//   console.log(sumRes.value)
// })

// obj.foo++


const obj = reactive(['foo'])

effect(() => {
  console.log(obj[0])
})
obj.length = 2




