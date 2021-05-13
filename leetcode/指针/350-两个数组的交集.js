/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersection = function(nums1, nums2) {
  let set = new Set()
  for (let i = 0; i < nums1.length; i++) {
    let l = 0
    while(l < nums2.length) {
      if (nums1[i] === nums2[l]) {
        set.add(nums1[i])
      }
      l++
    }
  }
  return [...set]
}
console.log(intersection([1,2,2,1],[2,2]))