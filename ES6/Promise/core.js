// Promise中的then第二个参数和catch有什么区别？

// 1、如果在then的第一个函数里抛出了异常，后面的catch能捕获到，而then的第二个函数捕获不到
// 2、then的第二个参数和catch捕获错误信息的时候会就近原则，如果prmoise内部报错，reject抛出
// 错误后，then的第二个参数和catch方法都存在的情况下，只有then的第二个参数能捕获到，如果then的
// 第二个参数不存在，则catch方法会捕获
