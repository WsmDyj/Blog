function log1(next) {
  console.log(1.1)
   next()
  console.log(1.2)
}

function log2(next) {
  console.log(2.1)
   next()
  console.log(2.2)
}

function fn(array) {
  function dispatch(index) {
    if (array.length === index) return Promise.resolve()
    return Promise.resolve().then(array[index](() => dispatch(index + 1)))
  }
  return dispatch(0)
}

fn([log1, log2])

// 1。1
// 2。1
// 2。2
// 1。2
