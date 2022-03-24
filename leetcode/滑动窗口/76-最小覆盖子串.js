// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

var minWindow = function(s, t) {
  let need = {}, window = {};
  for (let a of t) {
    need[a] = (need[a] || 0) + 1;
  }
  let left = 0,right = 0;
  let valid = 0;
  let start = 0, len = Number.MAX_VALUE;
  while (right < s.length) {
    let c = s[right];
    right++;
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] == need[c]) {
        valid++;
      }
    }
    // 当验证数量与需要的字符个数一致时，就应该收缩窗口了
    while (valid === Object.keys(need).length) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      //即将移出窗口的字符
      let d = s[left];
      // 左移窗口
      left++;
      if (need[d]) {
        if (window[d] == need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  return len == Number.MAX_VALUE ? "" : s.substr(start, len);
};

console.log(minWindow('ADOBEC', 'ABC'))
