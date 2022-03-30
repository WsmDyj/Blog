//
// Promise.all = function(array) {
//   return new Promise((resolve, reject) => {
//     if (!array || array.length === 0) {
//       resolve([])
//     }
//     let count = 0, result = []
//     for (let i = 0; i < array; i++) {
//       Promise.resolve(array[i]).then((data) => {
//         result[i] = data
//         if (++count === array.length) {
//           resolve(result)
//         }
//       },
//       (err) => {
//         reject(err)
//         return
//       }
//       )
//     }
//   })
// }
//
// Promise.race = function(array) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < array.length; i++) {
//       Promise.resolve(array[i]).then((data) => {
//         return resolve(data)
//       },(err) => {
//         reject(err)
//         return
//       })
//     }
//   })
// }

const promise1 = Promise.resolve(3);

const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));

const promises = [promise1, promise2];

function customAlLSettled(promises) {
  let result = [], count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(res => {
        result[i] = {
          status: 'fulfilled',
          value: res
        }
      }).catch(err => {
        result[i] = {
          status: 'rejected',
          reason: err
        }
      })
      .finally(() => {
        count++
        if (count === promises.length) {
          resolve(result)
        }
      })
    }
  })
}

customAlLSettled(promises).

then((results) => results.forEach((result) => console.log(result.status)));


// expected output:
// "fulfilled"
// "rejected"
