const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"

function myPromise(fn) {
  const that = this
  that.status = PENDING
  that.value = null
  that.reason = null

  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(value))
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.rejectedCallbacks.map(cb => cb(reason))
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  if (that.status === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }

  if (that.status === RESOLVED) {
    onFulfilled(that.value)
  }

  if (that.status === REJECTED) {
    onRejected(that.reason)
  }
  return that
}


const p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  } , 1000)
})
p.then(res => {
  console.log(res)
})
.then(() => {
  console.log('hej')
})
