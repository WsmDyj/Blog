function setWindowProp(prop, value, isDel) {
  if (value === undefined || isDel) {
    delete window[prop]
  } else {
    window[prop] = value
  }
}

class Sandbox {
  name;
  proxy = null;
  // 沙箱期间新增的全局变量
  addedPropsMap = new Map();
  // 沙箱期间更新的全局变量
  modifiedPropsOriginValueMap = new Map()
  // 持续记录更新的（新增和修改）全局变量的map，用于在任意时刻做沙箱激活
  currentUpdatedPropsValueMap = new Map()
  // 应用沙箱被激活
  active() {
    // 根据之前修改的记录重新修改window的属性，即还原沙箱之前的状态
    this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v, false))
  }
  // 应用卸载
  inactive() {
    // 1 将沙箱期间修改的属性还原为原先的属性
    this.modifiedPropsOriginValueMap.forEach((v, p) => setWindowProp(p, v, false))
    // 2 将沙箱期间新增的全局变量消除
    this.addedPropsMap.forEach((_, p) => setWindowProp(p, undefined, true))
  }

  constructor(name, context = {}) {
    this.name = name
    const fakeWindow = Object.create({})
    const { addedPropsMap, modifiedPropsOriginValueMap, currentUpdatedPropsValueMap } = this
    const proxy = new Proxy(fakeWindow, {
      set(_, prop, value) {
        if (!window.hasOwnProperty(prop)) {
          // 如果window上没有属性，记录到新增属性里
          addedPropsMap.set(prop, value)
        } else if (!modifiedPropsOriginValueMap.has(prop)) {
          // 如果当前window对象有该属性，且未更新过，则记录该属性在window上的初始值
          const originValue = window[prop]
          modifiedPropsOriginValueMap.set(prop, originValue)
        }
        // 记录修改属性以及修改后的值
        currentUpdatedPropsValueMap.set(prop, value)
        // 设置值到全局window上
        setWindowProp(prop, value, false)
        console.log("window.prop", window[prop])
        return true
      },
      get(target, prop) {
         return window[prop]
      }
    })
    this.proxy = proxy
  }
}
// 初始化一个沙箱
const newSandBox = new Sandbox('app1')
const proxyWindow = newSandBox.proxy
proxyWindow.test = 2
console.log(window.test, proxyWindow.test)

// 关闭沙箱
newSandBox.inactive()
console.log(window.test, proxyWindow.test);
// 重启沙箱
newSandBox.active();
console.log(window.test, proxyWindow.test) // 1 1 ;