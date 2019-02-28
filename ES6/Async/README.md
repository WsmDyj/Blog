async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。

想较于 Generator，Async 函数的改进在于下面四点：

* 内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样
* 更好的语义。async 和 await 相较于 * 和 yield 更加语义化。
* 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）
* 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

## 语法
async 返回一个 Promise 对象。函数内部 return 返回的值。会成为then方法回调函数的参数
```
async function  f() {
    return 'hello world'
};
f().then( (v) => console.log(v)) // hello world
```
如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态。抛出的错误而会被 catch 方法回调函数接收到。
```
async function e(){
    throw new Error('error');
}
e().then(v => console.log(v))
.catch( e => console.log(e));
```
async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变
```
const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'
```
## Async 函数的错误处理
```
let a;
async function f() {
    await Promise.reject('error');
    a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));
```
如上面所示，当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。
解决办法：可以添加 try/catch。
```
// 正确的写法
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}

correct().then(v => console.log(a)); // 1
```
## 如何在项目中使用
> npm install babel-preset-es2015 babel-preset-stage-3 babel-runtime babel-plugin-transform-runtime

修改.babelrc:
```
"presets": ["es2015", "stage-3"],
"plugins": ["transform-runtime"]
```
这样就可以在项目中使用 async 函数了。

## 注意点
await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```
多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
```
// async 函数的写法
const start = async () => {
  const res = await fetch('google.com');
  return res.text();
};

start().then(console.log);
```
## async函数的原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
```
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```
## 异步遍历的接口
异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象
```
asyncIterator
  .next()
  .then(
    ({ value, done }) => /* ... */
  );
```
上面代码中，asyncIterator是一个异步遍历器，调用next方法以后，返回一个 Promise 对象。因此，可以使用then方法指定，这个 Promise 对象的状态变为resolve以后的回调函数。回调函数的参数，则是一个具有value和done两个属性的对象，这个跟同步遍历器是一样的。