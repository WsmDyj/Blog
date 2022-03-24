// 输入：s = "((("
// 输出：3
var minAddToMakeValid = function(s) {
  // res 记录插入次数 need 记录右括号的需求量
  let res = 0, need = 0
  for (let c of s) {
    if (c === '(') {
      need++
    }
    if (c === ')') {
      need--
      if (need == -1) {
        need = 0;
        res++;
      }
    }
  }
  return res + need
};
console.log(minAddToMakeValid('((('))
