/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = m - 1, j = n -1, k = m + n -1
  while(i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i]
      i--
    } else if (nums1[i] <= nums2[j]) {
      nums1[k] = nums2[j]
      j--
    }
    k--
  }
  function arrayCopy(nums2, srcIndex, nums1, destIndex, length) {
    nums1.splice(destIndex, length, ...nums2.slice(srcIndex, srcIndex + length))
  }
  arrayCopy(nums2, 0, nums1, 0, j + 1)
  return nums1
}
console.log(merge([0], 0, [1], 1))