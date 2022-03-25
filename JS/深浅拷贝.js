function isObject(target) {
  const type = typeof target
  return type != null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target).replace('[object ', '').replace(']', '').toLowerCase()
}


function getInit(target) {
  const Con = target.constructor
  return new Con()
}

function deepClone(target, map = new WeakMap()) {
    // 原始类型
    if (!isObject(target)) {
      return target
    }
    const deepMap = ['array', 'set', 'map', 'object', 'arguments']
  
    const type = getType(target)
    
    let obj
    if (deepMap.includes(type)) {
      obj = getInit(target)
    }
    if (map.has(target)) {
      return map.get(target)
    }
    map.set(target, obj)
    switch (type) {
      case 'set':
        target.forEach(value => {
          obj.add(deepClone(value, map))
        })
        return obj
      case 'map':
        target.forEach((value, key) => {
          obj.set(key, deepClone(value, map))
        })
        return obj
      case 'array':
      case 'object':
        for (const key in target) {
          obj[key] = deepClone(target[key], map)
        }
        return obj
      case 'date':
        obj = target.constructor
        return new obj(target)
      case 'symbol':
        return Object(Symbol.prototype.valueOf.call(target))
      case 'function':
        // 区分箭头函数
        const funString = target.toString()
        if (target.prototype) {
          return target
        } else {
          obj = eval(funString)
        }
        return obj
    }
    return obj
}

let map = new Map()
map.set('a', 1)
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  field5: map,
  field6: new Date(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
};

const a = deepClone(target)

