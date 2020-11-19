var permuteUnique = function (nums) {
  let len = nums.length, res = [], path = []
  if (len === 0) return
  let used = new Array(nums.length).fill(false);
  nums.sort((x, y) => x - y);
  dfs(nums, len, 0, path, used, res)
  return res
};

function dfs (nums, len, depth, path, used, res) {
  if (depth === len) {
    res.push([...path])
    return
  }
  for (let i = 0; i < len; i++) {
    if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) {
      continue;
    }
    path.push(nums[i])
    used[i] = true;
    dfs(nums, len, depth + 1, path, used, res)
    used[i] = false;
    path.pop();
  }
}
console.log(permuteUnique([3, 3, 0, 3]))