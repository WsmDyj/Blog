function content(obj) { // 寄生
  function F(){}
  F.prototype = obj
  return new F()
}
