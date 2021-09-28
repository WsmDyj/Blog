
function flattenArray(arr) {
  return arr.toString().split(',').map(it => {
    return +it
  })
}

function flattenArray1(arr) {
  let result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray1(item))
    } else {
      result.push(item)
    }
  }
  return result
}

// reduce
function flattenArray2(arr) {
  return arr.reduce((acc, arr) => {
    return acc.concat(Array.isArray(arr) ? flattenArray2(arr) : arr)
  }, [])
}

function flattenArray3(arr) {
  while(arr.some(it => Array.isArray(it))) {
    arr = [].concat(...arr);
  }
  return arr;
}


console.log(flattenArray3([[0], [2, 3, 4], 1, [1, [2, 3]]]))