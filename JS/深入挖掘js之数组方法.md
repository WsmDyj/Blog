## 遍历数组

* 1.forEach
```
	let animals = ['dog','cat','pig']
   animals.forEach(item =>{
    console.log(item)
    })
```
* 2. filter() 过滤数组中的某些元素，在回调函数中设置条件，不满足的都会被过滤掉，返回一个新的数组
```
  let animals = [
    {name:'dog',age:2},
    {name:'cat',age:3},
    {name:'pig',age:5}
];
let newAnimals = animals.filter(item=>{
    return item.age >3;
})
console.log(newAnimals)
```

* 3.map() 遍历整个数组，返回一个新数组，新数组里的元素经过的指定回调函数的处理
```
let newAnimals = animals.map(item=>{
    item.age = item.age+'年'
    return item;
    // console.log(item)
})
console.log(newAnimals)
```
* 4.slice(1,2)接收两个参数（数组的下标）进行遍历
>	Array.prototype.slice.call(arguments,1)来获取第一个参数后的所有参数，
    
5.arr1.contact(arr2) 将两数组合并成一个新数组


## 判断数组 Array里有个isArray的方法
```
if（！Array.isArray(arr)){
	console.log('type error')
  return 
}
 ```   
 ## 数组去重
 * 1.双循环：
 先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组

 * 2.indexOf方法去重 （检索数组没有相同的，则返回-1）
 数组的indexOf()方法可返回某个指定的元素在数组中首次出现的位置。该方法首先定义一个空数组res，然后调用indexOf方法对原来的数组进行遍历判断，如果元素不在res中，则将其push进res中，最后将res返回即可获得去重的数组

 * 3.indexOf方法去重2
	利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
    
 indexOf方法可以返回某个字符串值在字符串中首次出现的位置
 Stringobject.indexOf(searchvalue,fromindex)
 searchvalue 必填，规定需检索的字符串值
 fromindex 可选的整数参数 0到Stringobject.length-1
 
 * 4.相邻元素去重
 调用数组排序方法sort()，然后根据排序后的结果进行遍历及相邻元素对比，如果相等则跳过此元素
 
 * 5.利用对象属性去重
 	创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值1，每出现一次，对应的属性值增加1，这样，属性值对应的就是该元素出现的次数了
  
* 6.set与结构赋值去重
  es6新增的数据类型，set的一个最大的特点就是数据不重复。set函数可以接受一个数组作为参数来初始化，
  > return [...new Set(arr)]

  * 7.Array.from 和set去重
  Array.from方法可以将Set结构转换为数值结果，而我们知道set结果是不重复的数
   > return Array.from(new Set(arr))
         
 Array.from j将其他对象转换成数组
  1.Set Map Array
  2.类数组对象 