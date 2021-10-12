var myReverse = function (arr) {
  for(var i=0;i<arr.length/2; i++) {
    var temp =arr[i];
    arr[i] = arr[arr.length -1-i];
    arr[arr.length-1-i] = temp;
  }
  return arr
}

var addTwoNumbers = function (l1, l2) {
  let len1 = l1.length,
    len2 = l2.length,
    minArr,
    maxArr
  if (len1 >= len2) {
    minArr = myReverse(l2)
    maxArr = myReverse(l1)
  } else {
    maxArr = myReverse(l1)
    minArr = myReverse(l2)
  }
  let res = new Array(maxArr.length).fill(0)
  for (let i = 0; i < maxArr.length; i++) {
    let sum = 0
    if (i < minArr.length) {
      sum = res[i] + maxArr[i] + minArr[i]
    } else {
      sum = res[i] + maxArr[i]
    }

    if (sum >= 10) {
      res[i + 1] = 1
      sum = sum % 10
    }
    res.splice(i, 1, sum)
  }
  return res
}

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]))
