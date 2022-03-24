// 输入：haystack = "hello", needle = "ll"
// 输出：2

var strStr = function(haystack, needle) {
    let n = haystack.length, m = needle.length;
    for (let i = 0; i < n; i++) {
      let flag = true
      for (let j = 0; j < m; j++) {
        if (haystack[i + j] != needle[j]) {
          flag = false
          break
        }
      }
      if (flag) {
        return i
      }
    }
    return -1
};

console.log(strStr("hello", "ll"))