function createIterator(item) {
  var i = 0
  return {
    next: function () {
      var done = i >= item.length
      var value = !done ? item[i++] : undefined
      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }

// for (let value of iterator) {
//   console.log(value)
// }

const obj = {
  value: 1
}
obj[Symbol.iterator] = function () {
  return createIterator([1,2,3,4])
}
for (value of obj) {
  console.log(value)
}

const colors = ['red', 'green', 'blue']
// for (let color of colors) {
//   console.log(color)
// }

colors[Symbol.iterator] = function () {
  return createIterator([5,6,7])
}
for (let color of colors) {
  console.log(color)
}

// 模拟实现 for of 
function forOf(obj, cb) {
  let iterable, result
  if (typeof obj[Symbol.iterator] !== 'function') 
    throw new TypeError(result + 'is not iterable')
  if (typeof cb !== 'function')
    throw new TypeError('cb must be callable')
  iterable = obj[Symbol.iterator]()

  result = iterable.next()
  while (!result.done) {
    cb(result.value)
    result = iterable.next()
  }
}
