async function log1(next) {
  console.log(1.1)
  await next()
  console.log(1.2)
}

async function log2(next) {
  console.log(2.1)
  await next()
  console.log(2.2)
}

function fn(array) {
  function dispatch(index) {
    if (index === array.length) return Promise.resolve()
    return Promise.resolve(array[index](() => dispatch(index + 1)))
  }
  return dispatch(0)
}

fn([log1, log2])

// 1。1
// 2。1
// 2。2
// 1。2
