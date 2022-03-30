// 输入：num1 = "11", num2 = "123"
// 输出："134"
var addStrings = function(num1, num2) {
  num1 = num1.padStart(num2.length, '0')
  num2 = num2.padStart(num1.length, '0')
  let len = num1.length - 1
  let i = num1.length - 1, res = new Array(num1.length).fill(0)
  while (i >= 0) {
    const n2 = Number(num2[i]) || 0
    const n1 = Number(num1[i]) || 0
    const sum = n2 + n1 + res[len - i]
    if (sum >= 10) {
      res[len - i] = sum - 10
      res[len - i  +1] = 1
    } else {
      res[len - i] =  sum
    }
    i--
  }
  return res.reverse().join('')
};
console.log(addStrings('584', '518'))
