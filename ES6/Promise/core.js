var obj = { a: 2 }
var myObj = Object.create(obj)
obj.a = 1
console.log(myObj.a)


function A () {
  this.foo = 1
}
A.prototype.bar = () => {
  console.log(this.foo)
}
const a = new A()
a.bar()


function fn () {
  console.log(this.a);
}
var obj = {
  a: 2,
  fn: fn
}
var bar = obj.fn;
bar();



