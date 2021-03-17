/**
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 */


 // 投票算法的原理:
 // 票数count = 1   候选人majority = nums[0]
 // if (相同) count+1 else count-1
 // 当count=0 更换majority 重置count=1
//  return majority

var majorityElement = function (nums) {
  let majority = nums[0],count = 0
  for(let i = 1;i<nums.length;i++) {
    if (count == 0) {
      majority = nums[i]
    } 
    if (nums[i] === majority) {
      count ++
    } else {
      count --
    }
  }
  return majority
}