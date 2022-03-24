const fn = (name) => {
  console.log('我是：', name)
}

const p2 = new Proxy(fn, {
  apply(target, thisArg, argArray) {
    target.call(thisArg, ...argArray)
  }
})

p2('kledwu')
