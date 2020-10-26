var findContentChildren = function (g, s) {
  const sortFun = function (a, b) {
    return a - b
  }
  g.sort(sortFun)
  s.sort(sortFun)
  let i = 0
  s.forEach(n => {
    if (n >= g[i]) {
      i++
    }
  })
  return i
};