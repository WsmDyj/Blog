// Promise中的then第二个参数和catch有什么区别？

// 1、如果在then的第一个函数里抛出了异常，后面的catch能捕获到，而then的第二个函数捕获不到
// 2、then的第二个参数和catch捕获错误信息的时候会就近原则，如果prmoise内部报错，reject抛出
// 错误后，then的第二个参数和catch方法都存在的情况下，只有then的第二个参数能捕获到，如果then的
// 第二个参数不存在，则catch方法会捕获
function A() {
  let a = 1
  const b = function c() {
    console.log(1)
  }
}

try {
  Promise.resolve().then(() => {
    throw new Error('1')
  }, e => console.log('c',e))
} catch (e) {
  console.log('b', e)
}

new Promise(() => {
  try {
    throw new Error('1')
  } catch (e) {
    console.log('catch',e)
  }
}).catch(e => console.log('.catch', e))


// Promise的then回调是否会被推入微任务队列取决于Promise的状态是否是 fulfilled 或 rejected
//
// Promise的状态是pending时，调用then会在该Promise上注册一个回调，等待Promise状态变更；
//
// Promise的状态是fulfilled或rejected时，调用then会立即创建一个微任务，将注册的回调推入微任务队列中；
