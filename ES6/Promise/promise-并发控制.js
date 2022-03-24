// 开发中需要在多个promise处理完成后执行后置逻辑，通常使用Promise.all：

// Primise.all([p1, p2, p3]).then((res) => ...)
// 但是有个问题是，因为 promise 创建后会立即执行，也就是说传入到 promise.all 中的多个 promise 实例，
// 在其创建的时候就已经开始执行了，如果这些实例中执行的异步操作都是 http 请求，那么就会在瞬间发出 n 个 http 请求，这样显然是不合理的；
// 更合理的方式是：对 Promise.all 中异步操作的执行数量加以限制，同一时间只允许有 limit 个异步操作同时执行。


const timeout = (i) => {
  console.log("开始", i)
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(i)
      console.log("结束", i)
    }, i)
  )
}

async function asyncPool(limit, array, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of array) {
    const p = Promise.resolve(iteratorFn(item))
    const e = p.then(() => { executing.splice(executing.indexOf(e), 1)})
    executing.push(e)
    if (executing.length >= limit) {
      await Promise.race(executing)
    }
  }
  return Promise.all(ret)
}

asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(res => console.log(res))
