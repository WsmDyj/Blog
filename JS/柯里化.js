// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;

function add() {
  let _args = Array.prototype.slice.call(arguments)
  const _adder = function () {
    _args.push(...arguments)
    return _adder
  }
  _adder.toString = function () {
    return _args.reduce((acc, cur) => {
      return acc + cur
    })
  }
  return _adder
}

add(1)(2)(3)

