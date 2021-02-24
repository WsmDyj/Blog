var obj = {
  a: 1,
  getA: function() {
    console.log(this === obj)  // true
    console.log(this.a) // 1
  }
}
obj.getA()

var MyClass = function() {
  this.name = 'sven'
}
var myclass = new MyClass()
console.log(myclass.name)

function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo: foo
}
var obj1 = {
  a: 42,
  obj2: obj2
}
obj1.obj2.foo()