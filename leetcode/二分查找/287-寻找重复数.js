// 二分查找有两种：
// 对索引二分，一般用于有序数组中找元素，有序数组中，索引的大小可以反映值的大小，因此对索引二分即可。 
// 对值域二分。重复数落在[1, n]，可以对[1, n] 这个值域二分查找。

const findDuplicate = (nums) => {
  let lo = 1;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) /2);  // 求中位数
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) {
        count++;
      }
    }
    if (count > mid) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
}
