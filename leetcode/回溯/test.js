var combine = function(n, k) {
  let res = [], arr = [], path = []
  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }
  backTrack(arr, res, path, k, 0)
  return res
};
function backTrack(arr, res, path, k, begin) {
  if (path.length === k) {
    res.push([...path])
    return
  }
  for (let i = begin; i < arr.length; i++) {
    path.push(arr[i])
    backTrack(arr,res, path,k, i + 1)
    path.pop()
  }
}

console.log(combine(4,2))
