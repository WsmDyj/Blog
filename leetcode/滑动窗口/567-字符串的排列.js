var checkInclusion = function(s1, s2) {
  let need = {}, window = {}
  for (let a of s1) {
    need[a] = (need[a] || 0) + 1
  }
  let left = 0, right = 0, valid = 0
  while (right < s2.length) {
    let c = s2[right]
    right++
    // 进行窗口内数据的一系列更新
    if (need[c]) {
      window[c] = (window[c] || 0) + 1
      if (window[c] === need[c]) {
        valid++
      }
    }
    // 判断左侧是否需要锁紧
    while (right - left >= s1.length) {
      if (valid === Object.keys(need).length) return true
      let d = s2[left]
      left++
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--
        }
        window[d]--
      }
    }
  }
  return false
};

console.log(checkInclusion('ab', 'eibaooo'))
