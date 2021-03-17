function Person() {}
var person = new Person() 
console.log(person.__proto__ === Person.prototype) 
console.log(Person === Person.prototype.constructor)

// 属性屏蔽
var obj1 = {
  a: 1
}
var myObj = Object.create(obj1)
console.log(obj1.hasOwnProperty("a"))  // true  hasOwnProperty：判断一个属性是否是在对象上，不包括原型上的属性
console.log(myObj.hasOwnProperty("a"))  // false
myObj.a++
console.log(obj1.a, myObj.a)
console.log(myObj.hasOwnProperty("a"))  // true


function Animal(name) {
  this.name = name
  this.sleep = function() {
    console.log(this.name + '正在睡觉！')
  }
}
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃' + food)
}

function A() {
  this.foo = 1
}

// 原型链继承
function Cat() {}
Cat.prototype = new Animal('cat')

var cat = new Cat()
console.log(cat.name)
console.log(cat.eat('fish'))
console.log(cat.sleep())
console.log(cat instanceof Animal)  // instanceof 判断元素是否在另一个元素的原型链上

// 构造函数继承
function Dog() {
  Animal.call(this, 'tom')
}
var dog = new Dog()
console.log(dog.name)
console.log(dog.sleep())
// console.log(dog.eat('bone'))  // 报错


// 组合继承： 相当于构造继承和原型链继承的组合体
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

var pig = new Pig()
console.log(pig.name)
console.log(pig.sleep())
console.log(pig.eat('rice'))


function foo() {
  var a = 2
  function bar() {
    console.log(a)  // 输出什么
  }
  var c = 3
}

