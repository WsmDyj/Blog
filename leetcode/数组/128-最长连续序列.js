/*
  输入：nums = [100,4,200,1,3,2]
  输出：4
  解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */
var longestConsecutive = function (nums) {
  let set = new Set(), longestStreak = 0
  for (const num of nums) {
    set.add(num)
  }
  for (const cur of set) {
    if (!set.has(cur - 1)) {
      let currentNum = cur
      let currentStreak = 1
      while (set.has(currentNum + 1)) {
        currentNum += 1
        currentStreak += 1
      }
      longestStreak = Math.max(longestStreak, currentStreak)
    }
  }
  return longestStreak
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))
