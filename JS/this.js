Function.prototype.call2 = function (context) {
  var context = Object(context) || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn
  return result;
}

// 测试一下
var value = 2;

var obj = {
  value: 1
}

function bar (name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call(null); // 2

console.log(bar.call2(obj, 'kevin', 18));


// bind
Function.prototype.bind2 = function() {
  var that = this
  var context = [].shift.call(arguments)
  var args = [].slice.call(arguments)
  return function() {
    that.apply(context, args.concat([].slice.call(arguments)))
  }
}


