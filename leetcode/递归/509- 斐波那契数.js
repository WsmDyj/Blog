// 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

// F(0) = 0, F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
// 给定 N，计算 F(N) 。


var fib = function (num) {
  if (num === 1 || num ===2) {
    return num
  }
  return fib(num - 1) + fib(num - 2)
};


// var fibonacci = function (n, a= 0, b = 1) {
//   if (n <= 1) return b
//   return fibonacci(n-1, b, (a+b))
// }

// var  tail = function(n) {
//   if (n <= 1) return 1
//   return n * tail(n-1)
// }
var tail = function(n, total=1) {
  if (n===1) return total
  return tail(n-1, n*total)
}

// var tribonacci = function (n) {
//   if (n <= 1) return n
//   if (n === 2) return 1
//   return tribonacci(n-1) + tribonacci(n - 2) + tribonacci(n - 3)
// };

var tribonacci = function (n, a = 0, b = 1, c= 1) {
  if (n <= 0) return n
  if (n === 2) return c
  return tribonacci(n - 1, b, c, (b + a + c))
};


// console.log(tribonacci(25))

