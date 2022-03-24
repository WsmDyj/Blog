// 输入：s = "()[]{}"
// 输出：true

var isValid = function(s) {
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  }
  let stack = []
  for (let c of s) {
    if (map[c]) {
      if (!stack.length || stack[stack.length - 1] !== map[c]) {
        return false
      } else {
        stack.pop()
      }
    } else {
      stack.push(c)
    }
  }
  return !stack.length
};

console.log(isValid('(())[]{}'))
