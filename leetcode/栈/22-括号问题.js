/**
 * @param {number} n
 * @return {string[]}
 * @description 输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
 */
var generateParenthesis = function(n) {
 let res = []
 backtrack('', n, n, res)
 return res
};
function backtrack(curStr, left, right, res) {
 if (left === 0 && right === 0) {
   res.push(curStr)
  return
 }
 if (left > right) return;
 if (left > 0) backtrack(curStr + '(', left - 1, right, res)
 if (right > 0) backtrack(curStr + ')', left, right - 1, res)

}
console.log(generateParenthesis(3))
