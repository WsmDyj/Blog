/**
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:

输入: 2.00000, 10
输出: 1024.00000  2 10 = 2
 */

var myPow = function (x, n) {
  if (n===0) return 1
  if (n>0) {
    return 1/ myPow(x, -n)
  }
  if (n % 2) { // 奇数
    return x * myPow(x, n - 1)
  }    
  result = myPow(x * x, n / 2)
};