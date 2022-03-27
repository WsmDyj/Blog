// fn([['a', 'b'], ['n', 'm'], ['0', '1']])
// => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']
function combination(arr) {
  const newArr = [...arr]
  let result = newArr.shift()
  while (newArr.length) {
    const other = newArr.shift()
    const newResult = []
    result.forEach(item => {
      other.forEach(_item => {
        newResult.push(item + '' + _item)
      })
    })
    result = [...newResult]
  }
  return result
}

function fn(arr) {
  const res = []
  const def = (times, str = '', index = 1) => {
    if (index <= arr.length) {
      times.forEach((item) => {
        def(arr[index],str + item, index+1)
      })
    } else {
      res.push(str)
    }
  }
  def(arr[0])
  return res
}

console.log(fn([['a', 'b'], ['n', 'm'], ['0', '1']]))
