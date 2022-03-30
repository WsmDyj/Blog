// 自右到左依次执行，下一个任务的参数是上一个任务的返回结果，并且任务都是同步的，这样就能保证任务可以按照有序的方向和有序的时间执行。

let init = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4

steps = [step4, step3, step2, init]
let composeFunc = compose(...steps)

composeFunc(1, 2, 3).then(res => {
  console.log(res)
})


function compose(...args) {
  let init = args.pop()
  return function(...arg) {
    return args.reverse().reduce(function(acc, cur) {
      return acc.then(function(result) {
        return cur.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}
