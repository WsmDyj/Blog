// 输入：s = ["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]

var reverseString = function(s) {
  let slow = 0, fast = s.length - 1
  while (slow <= fast) {
    const swap = s[slow]
    s[slow] = s[fast]
    s[fast] = swap
    slow++
    fast--
  }
  return s
};

console.log(reverseString(["h","e","l","l","o"]))
