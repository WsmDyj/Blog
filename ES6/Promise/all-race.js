
Promise.all = function(array) {
  return new Promise((resolve, reject) => {
    if (!array || array.length === 0) {
      resolve([])
    }
    let count = 0, result = []
    for (let i = 0; i < array; i++) {
      Promise.resolve(array[i]).then((data) => {
        result[i] = data
        if (++count === array.length) {
          resolve(result)
        }
      },
      (err) => {
        reject(err)
        return
      }
      )
    }
  })
}

Promise.race = function(array) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      Promise.resolve(array[i]).then((data) => {
        return resolve(data)
      },(err) => {
        reject(err)
        return
      })
    }
  })
}
