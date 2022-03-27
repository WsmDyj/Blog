// 每秒循环输出123
function print() {
  let arr = [1,2,3]
  arr.reduce((acc, cur) => {
    return acc.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(console.log(cur)), 1000)
      })
    })
  }, Promise.resolve())
}
print()

// 红路灯 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light(func, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      func()
      resolve()
    }, wait)
  })
}

async function step () {
    Promise.resolve()
    .then(() => light(red, 3000))
    .then(() => light(yellow, 2000))
    .then(() => light(green, 1000))
  .then(() => step())
}
// step()

//
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise (array) {
  const data = []
  let promise = Promise.resolve()
  array.forEach((arr) => {
    promise = promise.then(arr).then(res => {
      data.push(res);
      return data; // 把每次的结果返回
    })
  })
  return promise
}

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//   console.log("done");
//   console.log(data); // data 为 [1, 2, 3]
// });


