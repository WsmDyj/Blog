// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]
var rotate = (nums, k) => {
  let cloneNums = [...nums]
  if (k <= 0) return nums
  let len = nums.length - k
  const spliceNums = nums.splice(0, len)
  const spliceNums2 = cloneNums.splice(len, nums.length)
  let res = spliceNums2.concat(spliceNums)
  return res
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))
