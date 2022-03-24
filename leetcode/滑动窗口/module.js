function slidingWindow(s, t) {
  let need = {}, window = {}
  for (let key of t) {
    need[key] = (need[key] || 0) + 1
  }
  let left = 0, right = 0, valid = 0
  while (right < s.length) {
    let chart = s[right]
    right++
    // ...
    
    while (window needs shrink) // 判断左侧窗口是否要收缩
    let d = s[left]
    left++
    // ...
  }
}
