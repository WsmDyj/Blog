var lastStoneWeight = function (stones) {
  let res = stones.sort((a, b) => b -a) // 剩余的石头
  if (res.length <= 1) {
    return res[0]
  }
  let tar = res[0] - res[1]
  res.splice(0, 2, tar)
  return lastStoneWeight(res.sort())
};

console.log(lastStoneWeight([8, 10, 4]))