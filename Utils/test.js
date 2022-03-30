//这是原始数组，可以看到嵌套了很多层的[]，也就是很多维数组
let arr = [1, 2, [2, 3], [10, 11], [3, [4, [5, [6, [7, [8, [9]]]]]]]];

const myFlat = (arr, num) => {
  if (num <= 0) return arr
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr.push(...arr[i])
    } else {
      newArr.push(arr[i])
    }
  }
  if (num < 0 ) {
    return newArr
  } else {
    num--
    newArr = myFlat(newArr, num)
  }
  return JSON.stringify(newArr)
}

// 数组扁平
const flat = (arr) => {
  return Array.isArray(arr) ? arr.reduce((acc, cur) => [...acc, ...flat(cur)], []) : [arr]
}
//
const flat1 = (arr) => {
  let result = []
  let stack = [...arr]
  while (stack.length) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val);
    } else {
      result.unshift(val);
    }
  }
  return result
}

console.log(flat1(arr))
