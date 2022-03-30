function Animal(name) {
  this.name = name
  this.sleep = function() {
    console.log(this.name + '正在睡觉！')
  }
}
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃' + food)
}
// 原型链继承 （在prototype 原型链上 new ）
// 继承父类的属性和方法，也能继承父类原型上的属性和方法
// 不能实现多继承，

function Cat() {}
Cat.prototype = new Animal('cat')

var cat = new Cat()
console.log(cat.name)
console.log(cat.eat('fish'))
console.log(cat.sleep())
console.log(cat instanceof Animal)  // instanceof 判断元素是否在另一个元素的原型链上

// 构造继承 （在函数里通过call执行父类,将当前的this 绑定到父类上）
// 可以实现多继承但是原型链上的属性和方法无法继承
function Dog() {
  Animal.call(this, 'tom')
}
var dog = new Dog()
console.log(dog.name)
console.log(dog.sleep())
// console.log(dog.eat('bone'))  // 报错


// 组合继承： 相当于构造继承和原型链继承的组合体
// 调用两次父类构造函数（耗内存）
function Snake() {
  Animal.call(this, 'snake')
}
Snake.prototype = new Animal()

var snake = new Snake()
console.log(snake.name)
console.log(snake.sleep())
console.log(snake.eat('apple'))

// 原型式继承： 用一个函数包装一个对象，用来输出对象和承载继承的原型
function content(obj) { // 寄生
  function F(){}
  F.prototype = obj
  return new F()
}
var Irabbit = new Animal('rabbit')  // 拿到父类的实类
var rabbit = content(Irabbit)
console.log(rabbit.name)
console.log(rabbit.sleep())
console.log(rabbit.eat('turnip'))

// 寄生组合继承(常用)
//寄生：在函数内返回对象然后调用</br >
//组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参

var con = content(Animal.prototype) // con实例(F实例)的原型继承了父类函数的原型

// 组合
function Pig() {
  Animal.call(this, 'pig')  // 继承了父类构造函数的属性
} // 解决类组合式两次调用构造函数属性的缺点。
Pig.prototype = con // 继承con的实例
con.constructor = Pig // 修复实例

const pig = new Pig()
console.log(pig.name)
console.log(pig.sleep())
console.log(pig.eat('rice'))
