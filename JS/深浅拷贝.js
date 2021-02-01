// 浅拷贝
function shallowCopy (target, source) {
  if (!source || typeof target !== 'object') return
  for (var key in source) {
    if (source.hasOwnProperty(key)) {  // 排除原型链上的属性
      target[key] = source[key]
    }
  }
}

var arr = [1,2,3]
var arr2 = []
shallowCopy(arr2, arr)
console.log(arr2)

// 改变，相互影响
arr2[0] = 4
console.log(arr) // [4,3,2]
console.log(arr2)  // [1,2,3]


// 深拷贝
function DeepCopy(target, source) {
  if (!source || typeof source !== 'object') return
  for (var key in source) {
    if (source.hasOwnProperty(key)) { // 排除原型链上的属性
      if (source[key] && typeof source[key] === 'object') {  // 判断下层是否是object
        target[key] = Array.isArray(source[key]) ? [] : {}  // 判断是否是数组
        DeepCopy(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
}

let obj = {
  name: 'leeper',
  age: 20,
  friend: {
    name: 'lee',
    age: 19
  }
};
let copyObj = {}
DeepCopy(copyObj, obj)
obj.name = 'vc'
obj.friend.name = 'Jerry';
console.log(copyObj.name)  // leeper
console.log(copyObj.friend.name) // lee