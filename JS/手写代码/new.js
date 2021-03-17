// 新生成一个对象
// 将新对象的原型指向构造函数的protorype
// 将构造函数的作用域赋值给新对象（即绑定新对象的 this）,执行构造函数中的代码（即为这个新对象添加属性）
// 返回新对象
function _new() {
  let newObj = {}
  let Constructor = Array.prototype.slice.call(arguments)
  newObj.__proto__ = Constructor.prototype
  Constructor.apply(newObj, arguments)
  return newObj
}