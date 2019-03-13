## 迭代器
所谓迭代器，其实就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。
```
function createIterator(item) {
  var i = 0
  return {
    next: function () {
      var done = i >= item.length
      var value = !done ? item[i++] : undefined
      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```
## for of
除了迭代器之外，我们还需要一个可以遍历迭代器对象的方式，ES6 提供了 for of 语句，我们直接用 for of 遍历一下我们上节生成的遍历器对象试试：
其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是"可遍历的"（iterable）。
```
const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}

// 1
// 2
// 3

```
 for of 遍历的其实是对象的 Symbol.iterator 属性。
 ```
 const colors = ["red", "green", "blue"];

for (let color of colors) {
    console.log(color);
}

// red
// green
// blue
```
尽管我们没有手动添加 Symbol.iterator 属性，还是可以遍历成功，这是因为 ES6 默认部署了 Symbol.iterator 属性，
for...of 循环可以使用的范围包括：
* 数组
* Set
* Map
* 类数组对象，如 arguments 对象、DOM NodeList 对象
* Generator 对象
* 字符串