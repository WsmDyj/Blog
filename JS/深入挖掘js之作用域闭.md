## 一、实质问题
* 当函数可以记住并访问所在的词法作用域是，就产生了闭包。有的人会很好奇，什么是词法作用域，接下来我给大家普及一下什么是词法作用域。
### 词法作用域
简单的来说词法作用域就是定义在词法阶段的作用域，换就话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的
```
function foo(a){
    var b = a*2;
    function bar(c){
        console.log(a,b,c);
    }
    bar (b*3);
}
foo(2);
```
在这个例子中包含了三个逐级嵌套的作用域
* 1、包含整个全局作用域，foo
* 2、包含着foo所创建的作用域，a , bar , b
* 3、包含着bar所穿件的作用域 ，c


----------


关于词法作用域我们就现讲这么多，接下来还是回到我们的正文，作用域闭包
```
function foo(){
    var a=2;
    function bar(){//bar()的词法作用域能够访问foo()的内部作用域
        console.log(a);
    }
    return bar;//将bar()函数当做一个值类型进行传递
}
var baz =foo();
baz(2);
```
foo()内部作用域依然存在，没有被回收。bar()依然持有该作用域的引用。这个引用就叫闭包
```
function foo(){
    var a=2;
    function baz(){
        console.log(a);
    }
    bar(baz);
}

function bar(fn){
    fn();
}
foo();
//把内部函数baz传递给bar，
// 当调用这个内部函数，
// 他涵盖的foo()内部作用域的闭包就可以观察到了，因为它能够访问a
```
```
var fn;
function foo(){
    var a =2;
    function baz(){
        console.log(a);
    };
    fn = baz;
}

function bar(){
    fn();
}
foo();
bar();

```
* 无论通过何种手段将内部函数传递到所在的词法作用域以外，他都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。
## 二、提升
```
function wait(message){
    setTimeout(function timer(){
        console.log(message)
    },1000);
};
wait("hello world");
```
在引擎内部，内置的工具函数setTimeout()持有对一个参数的引用，引擎会调用这个函数，在这个例子中就是内部的timer函数，而词法作用域就在这个过程中保持完整。这就是闭包。
## 三、循环和闭包
```
for(var i=0;i<=5;i++){
    setTimeout(function timer() {
        console.log(i);
    }, i*1000);
}
//大家猜猜结果会是啥？
```
正常情况下会分别输出数字1~5，但实际会输出五次6。
* 延迟函数的回调会在循环结束时才执行。可以想象一下异步加载机制。因此settimeout每次要等到循环结束后才显示值，这样就得到了我们的结果，输出了五次6。
代码中有什么缺陷导致它的行为通语义所暗示的不一致呢？
我们需要更多的作用域，特别是在循环的过程中每个迭代都要一个闭包作用域，因此想到了立即执行函数
```
for( var i=0;i<=5;i++){
    (function(){
        setTimeout(function timer() {
        console.log(i);
    }, i*1000);
    })();
}
```
这样子为什么还不行呢？我们显然拥有了更过的词法作用域。
每个延迟函数都会讲IIFE在每次迭代中创建的作用域封闭起来。
* 如果作用域是空的话，我们的IIE只是一个什么都没用的空作用域。
```

for( var i=1;i<=5;i++){
    (function(){
        var j =i;
        setTimeout(function timer() {
        console.log(j);
    }, j*1000);
    })();
}
```
### 重返块作用域
```
for(let i =1;i<=5;i++){
    
    setTimeout(function timer() {
        console.log(i);
    }, i*1000);
}
```
let欺骗此法作用域，每次在迭代都去创建一个新的作用域，然后执行完后被销毁，这样每个迭代都有自己的作用域就可以达到我们的预期效果，输出1~5。
## 四、模块
```
function coolModule(){
    var something = 'cool';
    var another = [1,2,3];
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join('!'));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = coolModule();

foo.doAnother();
foo.doSomething();
```
这个模式JavaScript中被称为模块，保护私有属性，只提供公共方法。
* 模块模式需要具备两个必要条件：
* 1、必须有外部的封闭函数
* 2、封闭函数必须返回至少一个内部函数
### 现代的模块机制
大多数模块依赖加载器/管理器本质上都是将这种模块定义封装进一个友好的API。
```
var MyModules = (function Manager(){
            var modules = {};
            function define(name,deps,impl){
                for(var i=0;i<deps.length;i++){
                    deps[i] = module[deps[i]];
                }
                modules[name] = impl.apply(impl,deps);
            }
            function get(name){
                return modules[name];
            };
            return{
                define: define,
                get: get
            };
})();

MyModules.define("bar",[],function(){
    function hello(who){
        return "Let me introduce:"+ who;
    }
    return {
        hello: hello
    };
});

MyModules.define("foo",["bar"],function(bar){
    var hungry = "hippo";
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

// console.log(bar.hello("hippo"));

foo.awesome();
```
