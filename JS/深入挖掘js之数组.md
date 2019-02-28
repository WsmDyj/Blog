## 一、数组字面量
* 数组字面量提供了一种非常方便的创建数组的表达法。
* 一个数组字面量是在一对方括号中包围零个或多个用逗号分隔的值的表达式。
对象字面量数组：
```
 var numbers_object = {
'0' : 'zero',
'1' : 'one',
'2' : 'two'
};
```

* javascript运行数组包括任意混合类型的数组。
## 二、长度
* 每个数组都有一个length的属性，JavaScript数组的length没有上界。如果你用大于等于当前length的数字作为下标来存储一个元素，那么length值会增大以容纳新元素，不会发生数组越界错误。
* length属性的值是这些数组的最大整数属性名加上1。它等于数组里的属性的个数。
> numbers.push('go');

可以使用push向数组中增加元素，也可以用.join['']方式加入到数组中。
## 三、删除
* JavaScript数组就是对象，delete运算符可以用来从数组中移除元素：
> delete numbers[2];

这样操作的话会使数组留下一个空洞，被删除的元素依旧保留着它在数组的位置，排在被删除后面的元素依旧保留着他们最初的属性。这样是不行的，我们就要去寻找一个新的方法去解决这个问题，splice方法
> numbers.splice(2,1);

* 第一个参数是数组的序号，第二个参数是删除元素的个数。
## 四、枚举
* 1、fon in 遍历每个数组的所有属性，无法保证数组的排序，可能从原型链上得到以外的属性。
* 2、for 来避免这些问题
```
 var i;
for(i=0;i<myArray.length;i+=1){
console.log(myArray[i];
};
```
## 五、方法
JavaScript提供了一套数组的方法，被存储在Array.prototype中的函数
```
Array.method('reduce',function(f,value){
    var i;
    for(i=0;i<this.length;i+=1){
        value = f((this[i]),value);
    }
    return value;
});
//通过各Array.prototype扩充一个方法，每个数组斗继承这个方法。
var data = [4,5,5,9];
var add = function(a,b){
    return a+d;
};
var mult = function(a,b){
    return a*b;
};
var sum = data.reduce(add,0);
console.log(sum);
var product = data.reduce(mult,1);
console.log(product);
```
## 六、指定初始值
* JavaScript数组通常不会预置顶。
* JavaScript提供一个类似Array.dim这样的方法

```
Array.dim = function(dimension,initial){
var a =[], i;
for (i=0;i<dimension;i+=1){
a[i] = initial;
}
return a;
};
var MyArray = Array.dim(10,0);
```
