// 每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组尾部放的就是已经处理过的元素

// new原理
function customNew () {
  let obj = {}
  let Constrouctor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constrouctor.prototype
  Constrouctor.apply(obj, arguments)
  return obj
}

// 深拷贝
function deepCopy (target, source) {
  if (!source && typeof source !== "object") return
  for (var key in source) {
    if (source[key] && typeof source[key] === "object") {
      target[key] = Array.isArray(source[key]) ? [] : {}
      deepCopy(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
}

// instanceof原理
function customInstanceof (leftValue, rightValue) {
  let rightProto = rightValue.prototype
  leftValue = leftValue.__ptoto__; // 取左边表达式的
  while (true) {
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightProto) {
      return true
    }
    leftValue = leftValue.__proto__
  }
}

// 防抖
function debounce (func, wait) {
  var timeout, result;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      result = func.apply(context, args)
    }, wait)
    return result
  }
}

// 截流
function throttle (func, wait) {
  var timeout
  return function () {
    if (!timeout) {
      var context = this, args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

Promise.all = function (promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      return reject(new TypeError('arguments must be an array'))
    }
    var count = 0, promiseNum = promiseArray.length, resolvedArray = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promiseArray[i]).then(function (value) {
          count++
          resolvedArray[i] = value
          if (count === promiseNum) {
            return resolve(resolvedArray)
          }
        }, function (reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

// 洗牌算法
function shuffle (arr) {
  var length = arr.length, temp, random
  while (length !== 0) {
    random = Math.floor(Math.random() * length)
    length--
    temp = arr[length]
    arr[length] = arr[random]
    arr[random] = temp
  }
  return arr
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr
  var destIndex = Math.floor(arr.length / 2)
  let left = [], right = [];
  var dest = arr.splice(destIndex, 1)[0]
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < dest) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([dest], quickSort(right))
}

console.log(quickSort([3,24,2,5,6]))