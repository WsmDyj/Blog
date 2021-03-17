async function async1 () {
  console.log('2');
  await async2();
  console.log('6');
}
async function async2 () {
  console.log('3');
}

console.log('1');

setTimeout(() => {
  console.log('8')
}, 0);

async1();

new Promise(function (reslove) {
  console.log('4');
  reslove();
}).then(function () {
  console.log('7');
})

console.log('5')


// 首先，new Promise是同步的任务，会被放到主进程中去立即执行。而.then()函数是异步任务会放到异步队列中去，那什么时候放到异步队列中去呢？当你的promise状态结束的时候，就会立即放进异步队列中去了。

// 带async关键字的函数会返回一个promise对象，如果里面没有await，执行起来等同于普通函数

// await 关键字要在 async 关键字函数的内部，await 写在外面会报错；
// await如同他的语意，就是在等待，等待右侧的表达式完成。此时的await会让出线程，阻塞async内后续的代码，先去执行async外的代码。等外面的同步代码执行完毕，
// 才会执行里面的后续代码。就算await的不是promise对象，是一个同步函数，也会等这样操作


var num = 1;
var myObject = {
  num: 2,
  add: function () {
    this.num = 3;
    (function () {
      console.log(this.num); // undefined
      this.num = 4;
    })();
    console.log('add',this.num);  // 3
  },
  sub: function () {
    console.log('sub',this.num);
  }
}


myObject.add();
console.log('myObject.num', myObject.num); // 3
var sub = myObject.sub;
sub(); // 4
