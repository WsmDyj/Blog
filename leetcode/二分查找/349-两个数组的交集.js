var intersection = function (nums1, nums2) {
  let arr = []
  let _nums2 = nums2.sort((a, b) => a - b)
  for (let i = 0; i < nums1.length; i++) {
    let _x = binarySearch(_nums2, nums1[i])
    if (_x && arr.indexOf(nums1[i]) === -1) {
      arr.push(nums1[i])
    }
  }
  return arr
}
function binarySearch (array, target) {
  let left = 0, right = array.length - 1, mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (array[mid] < target) {
      left = mid + 1
    } else if (array[mid] > target) {
      right = mid - 1
    } else {
      return true
    }
  }
  return false
}
console.log(intersection([1, 2, 2, 1], [2, 2]))