var scope = "global scope";
function checkscope () {
  var scope = "local scope";
  function f () {
    return scope;
  }
  return f();
}
checkscope()  // local scope


function checkscope () {
  var scope = "local scope";
  function f () {
    return scope
  }
  return f;
}
checkscope()() // local scope

var value = 1
function foo () {
  console.log(value)
}
function bar () {
  var value = 2
  foo()
}
bar()


var a = 10;
var o = {
  a: 11,
  b: {
    fn: function () {
      console.log(a);
    }
  }
}
o.b.fn();


var x = 10
function fn () {
  console.log(x)  //10  
}
function show (f) {
  var x = 20;
    (function() {
      f()
    })()
}
show(fn)

var a = 10
function fn () {
  var b = 20
  function bar () {
    console.log(a + b) // ?
  }
  return bar
}
var x = fn();
b = 200
x()


function zxxFn () {
  zxxs = 2
}
var zxx = 1
console.log(zxx) // 1
zxxFn() 
console.log(zxxs) // 2