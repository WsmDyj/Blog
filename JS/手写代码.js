// new
function _new() {
  // 1.创建一个对象
  var obj = new Object()
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let ret = Con.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

// promise.all()
function PromiseAll(promises) {
  let result = []
  let promiseCount = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i]
      Promise.resolve(val).then(res => {
        promiseCount++
        result[i] = res
        if (promiseCount === promises.length) {
          return resolve(result)
        }
      }, (err) => {
        return reject(err)
      })
    }
  })
}
