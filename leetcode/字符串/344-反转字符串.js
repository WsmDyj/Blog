/**
 * 解法：左右指针
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  let left = 0, right = s.length -1
  while(left < right) {
    let swarp = s[right]
    s[right] = s[left]
    s[left] = swarp
    left++
    right--
  }
  return s
}
console.log(reverseString(["h","e","l","l","o"]))