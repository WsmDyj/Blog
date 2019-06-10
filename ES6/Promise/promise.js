class Promise {
  constructor(executor) {
    // 初始化state为state转态
    this.state = 'pending' 
    // resolve的值
    this.value = undefined
    // 失败的值
    this.reason = undefined

    // 成功存放的数组
    this.onResolvedCallbacks = []
    // 失败存放的数组
    this.onRejectedCallbacks = []

    let resolve = value => { 
      // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfiled'
        // 存储成功的值
        this.value = value

        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }

    let reject = reason => {
       // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'rejected'
        // 存储失败的原因
        this.reason = reason

         // 一旦reject执行，调用失败数组的函数
         this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    // 如果executor报错，直接执行reject
    try{
      executor(resolve, reject)
    }catch(err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    // 申明返回的promise2
    let promiose2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value)
         // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promiose2, x, resolve, reject)
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        })
      }
    })
    return promiose2

     // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }

    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value);
      })
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}

// 链式调用
// then 方法返回的是一个新的Promise实例（注意不是原来的那个promise实例）。因此可采用链式写法