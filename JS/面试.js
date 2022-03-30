function parse(url) {
  let res = {}
  const arrs = url.split('?')[1].split('&')
  for (let arr of arrs) {
    if (arr.indexOf('=') > -1) {
      const [key, value] = arr.split('=')
      if (res[key]) {
        res[key] = [].concat(res[key], value).map(it => Number(it));
      } else {
        res[key] = value
      }
    } else{
      res[arr] = true
    }
  }
  return res
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=北京&enabled'
console.log(parse(url))


// for (var i=1; i<=5; i++) {
//   (function (i) {
//     setTimeout(() => console.log(i), 1000*i)
//   })(i)
// }
