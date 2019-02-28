## 一、伪类
* 当一个函数对象被创建时，Function构造器产生的函数对象会运行类似这样的代码：
>this.prototype = { constructor: this};

* 新函数对象被赋予了一个prototype属性，他的值是一个包含constructor属性且属性值为该新函数的对象。这个prototype对象是存放继承特征的地方。

```
Function.method('new',function(){
    //创建一个新对象，它继承自构造函数的原型对象
    var that = Object.create(this.prototype);
    // 调用构造函数，绑定-this-到新对象上
    var other = this.apply(that,arguments);
    //如果返回值不是一个对象，就返回该新对象
    return (typeof other ==='object'&&other)||that;
})
```
 我们定义一个构造器来扩充它的原型
```
var Mammal = function(name){
    this.name=name;
};
Mammal.prototype.get_name = function(){
    return this.name;
};
Mammal.prototype.says = function(){
    return this.saying || '';
}
```
现在我们构造一个实例
```
var myMammal = new Mammal('hello world!');
var name = myMammal.get_name();
```
我们构造一个伪类来继承Mammal,通过定义它的constructor函数并替换他的prototype为一个Mamma
```
var Cat = function(name){
    this.name =name;
    this.saying= 'meow';
}
```
替换Cat.prototype为一个新的Mammal实例
```
Cat.prototype =new Mammal();
```
扩充新原型对象增加get_name方法
```
Cat.prototype.get_name = function(){
    return this.says()+''+this.name+''+this.says();
};
var myCat =new Cat('wsm');
var says = myCat.says();
var name= myCat.get_name();
```
## 二、原型
* 构造一个有用的对象开始，接着可以构造更多和那个对象类似的对象。
> Object.create方法构造更多的实例
## 三、函数化
运用模块模式的继承模式去保护隐私。
* 1、创建一个新对象，可以通过构造一个对象字面量或者和new浅醉连用去调用一个构造函数，或者使用Object.create构造一个已经存在的对象的新实例，或者调用任意一个会韩慧一个对象的函数
* 2、有选择的定义私有实例变量和方法。
* 3、给这个新对象扩充方法。
* 4、返回那个新对象

