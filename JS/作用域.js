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
console.log(zxxs) // 


var  arr = [1,2,3]
function varOrlet() {
  // for (var i = 0; i < 10; i++) {
  //   setTimeout(function () { 
  //     console.log(i);
  //   }, 0);
  // }
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i) //  i 是循环体内局部作用域，不受外界影响。
    }, 0);
  }
}

varOrlet()