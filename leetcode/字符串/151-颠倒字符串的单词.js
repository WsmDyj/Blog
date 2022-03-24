// 输入：s = "the sky is blue"
// 输出："blue is sky the"

var reverseWords = function(s) {
  const str = s.split(' ').filter(it => it).reverse().join(' ')
  return str
};

console.log(reverseWords('  hello world  '))


