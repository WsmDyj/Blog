/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function(arr) {
  // map 数 --> 出现的次数
  let map = new Map(), len = arr.length, lucky = -1
  for (let i = 0; i < len; i++) {
    if (map.has(arr[i])) {
      let count = map.get(arr[i])
      map.set(arr[i], count + 1)
    } else {
      map.set(arr[i], 1)
    }
  }
  for (var [key, value]  of map) {
    if (key === value && key >= lucky) {
      lucky = key
    }
  }
  return lucky
}
var findLucky2 = function(arr) {
  let m = {}, lucky = -1
  arr.forEach(x => {
    m[x] = (x in m ? m[x] + 1 : 1)
  })
  Object.keys(m).forEach(key => {
    lucky = key === m[key] ? Math.max(key, lucky) : key
  })
  return lucky
}
console.log(findLucky2([1,2,2,3,3,3]))


var containsDuplicate = function(nums) {
  let m = {}
  for (let x of nums) {
    if (x in m) {
      return true
    }
    m[x] = 0
  }
  return false
};
console.log(containsDuplicate([1,2,3,4]))