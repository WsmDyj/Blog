// 们可以枚举 A 和 B 所有的对齐方式。对齐的方式有两类：
// 第一类为 A 不变，B 的首元素与 A 中的某个元素对齐；
// 第二类为 B 不变，A 的首元素与 B 中的某个元素对齐。
// 对于每一种对齐方式，我们计算它们相对位置相同的重复子数组即可。

const findLength = function(nums1, nums2) {
  let m = nums1.length, n = nums2.length
  for (let i = 0; i < m.length; i++) {
    let len = Math.min(m, n - i);
    let ret = 0, k = 0;
    for (let j = 0; j < len; j++) {
      if (nums1[0 + j] === nums2[i + j]) {
        k++;
      } else {
        k = 0
      }
      ret = Math.max(ret, k);
    }
  }
};

console.log(findLength([1,2,3,2,1], [3,2,1,4,7]))
