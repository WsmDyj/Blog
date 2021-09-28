// 输入：n = 234
// 输出：15 
// 解释：
// 各位数之积 = 2 * 3 * 4 = 24 
// 各位数之和 = 2 + 3 + 4 = 9 
// 结果 = 24 - 9 = 15
[].reduce
/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function(n) {
  let multiplication = n
    .toString()
    .split("")
    .reduce((acc, cur) => {
      return acc = acc * Number(cur)
    }, 1)
  let addition = n
    .toString()
    .split("")
    .reduce((acc, cur) => {
      return (acc += Number(cur))
    }, 0)
  return multiplication - addition
};
console.log(subtractProductAndSum(234))