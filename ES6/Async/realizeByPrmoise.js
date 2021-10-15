const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000))

// async function test() {
//   const data = await getData()
//   console.log(data)
//   return 'success'
// }
// test().then(res => console.log(res))

var test = asyncToGenerator(
  function* testG() {
    const data = yield getData()
    console.log('data')
    const data2 = yield getData()
    console.log("data2")
    return 'success'
  }
)

function asyncToGenerator(generatorFunc) {
  return function() {
    const gen = generatorFunc.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult
        try {
          generatorResult = gen[key](arg)
        } catch (e) {
          return reject(e)
        }
        const { value, done } = generatorResult
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }
      }
      step('next', '')
    })
  }
}
test().then(res => console.log(res))