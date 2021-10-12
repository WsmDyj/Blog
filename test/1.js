function Person(nick, age) {
  this.nick = nick
  this.age = age
}

Person.prototype.sayName = function() {
  console.log(this.nick)
}

var p1 = new Person('Byron', 12)
var p2 = new Person('Casper', 24)

p1.sayName()
p2.sayName()

console.log(p1.__proto__ === Person.prototype)
console.log(Person.prototype.constructor === Person)
console.log(Person.__proto__ === Function)