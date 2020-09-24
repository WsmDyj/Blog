// 输入:
// letters = ["c", "f", "j"]
// target = "a"
// 输出: "c"

// 输入:
// letters = ["c", "f", "j"]
// target = "c"
// 输出: "f"


/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 * 寻找左边界，所以就考虑每次搜索的区间定义为 [left, right);
当 letters[mid] <= target的时候，需要将left往右移动一位，
当 letters[mid] > target的时候，由于是左闭右开的，right = mid
当 left === right 的时候, 遍历完成， left 的含义就是，表示比 letters[left] 要小位置

 */

var nextGreatestLetter = function (letters, target) {
  let left = 0, right = target.length -1, mid;
  while(left <= right) {
    mid = Math.floor((left + right) /2)
    if (letters[mid] <= target) {
      left = mid + 1
    } else {
      right = mid -1
    }
  }
  return letters[left % letters.length];
};

console.log(nextGreatestLetter(["c", "f", "j"], "c"))