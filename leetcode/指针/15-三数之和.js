/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((x, y) => x - y)
  let res = new Set(), target = []
  for (let i = 0; i < nums.length; i++) {
      let left = i + 1, right = nums.length -1
      if(i != 0 && nums[i] == nums[i - 1]) continue
      if (nums[i] > 0) return target
      while(left < right) {
        let sum = nums[left] + nums[right] + nums[i]
        if (sum < 0) {
          left ++
        } else if (sum > 0) {
          right --
        } else if (sum == 0) {
          const str = [nums[left], nums[right], nums[i]].toString()
          if (!res.has(str)) {
            target.push([nums[left], nums[right], nums[i]])
            res.add(str)
          }
          left ++
          right --
        }
      }
  }
  return target
}
console.log(threeSum([-2,0,0,2,2]))