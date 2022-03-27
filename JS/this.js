let obj = {a: 1}
let proxy = new Proxy(obj, {

})

eval(
  (function (window) {
  console.log(window)
})(proxy))
