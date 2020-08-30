// 分治法 将大问题分为若干个小问题

const merge_sort = function (arr) {
  if (arr.length == 1)
    return arr
  var mid = Math.floor(arr.length / 2)
  var left = arr.slice(0, mid)
  var right = arr.slice(mid)
  return Merger(merge_sort(left), merge_sort(right)); //合并左右部分
}

const Merger = function(a,b) {
  var n = a && a.length;
  var m = b && b.length;
  var c = [];
  var i = 0, j = 0;

  while (i < n && j < m) {
    if (a[i] < b[j])
      c.push(a[i++]);
    else
      c.push(b[j++]);
  }

  while (i < n)
    c.push(a[i++]);

  while (j < m)
    c.push(b[j++]);

  // console.log("将数组", a, '和', b, '合并为', c)
  return c;
}

console.log(merge_sort([8, 7, 6, 5, 4, 3, 2, 1]))