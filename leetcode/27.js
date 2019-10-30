// 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
// 示例 1:
// 给定 nums = [3,2,2,3], val = 3,
// 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。




// splice 删除数组后面元素会补上来，需要i--
// var removeElement = function(nums, val) {
//   var numslen = nums.length;
//     for(let i = 0; i<numslen; i++){
//         if(nums[i]==val){
//             nums.splice(i,1)
//             i--;
//         }
//       }
//     return nums.length;
// };

console.log(removeElement([3,2,2,3], 3))