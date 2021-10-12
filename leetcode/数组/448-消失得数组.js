// 输入：nums = [4,3,2,7,8,2,3,1]
// 输出：[5,6]

function findDisappearedNumbers(nums) {
  let res = []
  for (const [i, num] of nums.entries()) {
    if (nums.indexOf(i) == -1 && i !== 0) {
      res.push(i)
    }
  }
  return res
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))