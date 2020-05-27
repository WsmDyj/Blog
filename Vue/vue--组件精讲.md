# Vue--组件精讲
## 一、基础介绍
### 组件分类
组件大致可以分为三类组件
* 1、页面组件，也就是通常使用路由渲染的组件
* 2、独立于项目的高度抽象的功能基础组件
* 3、服务于页面组件的业务组件，抽象度和颗粒度介于第一类和第二类中间
### 组件的三个API: props、event、slot
#### 属性props
props定义了这个组件有那些可配置的属性，最好用对象的写法。可以针对每个属性设置类型、默认值或自定义校验属性的值。组件里定义的props，都是单向数据流，组件不能修改props的值

使用组件时，也可以传入一些标准的html特性，比如id、class.这些元素会继承。如果不需要，在组件选项里配置 inheritAttrs: false 就可以禁用了
#### 插槽slot
可以分发组件内容,如果有多个插槽，会用到具名slot
#### 自定义事件event
自定义事件一般分为两种
* $emit，在组件内部自定义事件$emit到父组件
* 直接在父组件上声明，但是为了区分原生事件和自定义事件，要用到事件的修饰符.navtice,如果不写监听不到事件
### 组件的分类
Vue内置的通信手段一般有两种：
* 1、ref: 给元素或组件注册引用信息；
* 2、$parent / $children: 访问父/子实例
## 二、组件通信
### 组件通信1：provide/inject
ref和$parent / $children在跨级通信时会有弊端，以往会借助Vuex和Bus，但是需要引入三方库。但是vue内置的provid/inject无依赖的组件通信方法
```
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```
需要注意的是provide和inject绑定并不是可响应的，如果你传入了一个可监听的对象那么其对象的属性还是可响应的。所以
，上面的A.vue的name如果改变，B.vue的this.name是不会改变的，仍然是Aresn。
#### 替代Vuex
vuex状态管理，是一个转为vux开发的状态管理模式，用于集中式存储管理应用的所有
组件的状态，并以相应的规制保证状态以一种可预测的方式发生变化。主要的目的是跨组件
通信、全局数据维护、多人协同开发
```
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    provide () {
      return {
        app: this
      }
    }
  }
</script>
```
我们把整个app.vue理解为最外层的组件。用来存储所有的全局数据和状态，甚至计算（computed）
、方法(methods)等，因为你的项目中所有的组件(包含路由)，他的根组件都是app.vue。把整个app.vue实例通过provied对外提供
来访问app.vue的data、computed、methods等内容
### 组件通信2： 派发与广播--$eimt 和 $on
provide / inject API 主要解决了跨组件间的通信问题，它的使用场景，主要是子组件获取上级组件的
状态，跨级组件间建立一种主动提供与以来注入的关系，有两种场景不是很好的决解
* 父组件向子组件(支持跨级)传递数据
* 子组件向父组件(支持跨级)传递数据
$eimt 会在当前组件实例上出发自定事件，并传递一些参数给监听器的回调，父组件调用这个组件时，使用@on
的方式来监听自定义事件

$on 监听了自己触发的自定义事件，因为有时不确定何时会触发事件，一般会在 mounted 或 created 钩子中来监听。
### 组件通信3：找到任意组件实例——findComponents 系列方法
详见src/utils/assist.js文件夹
## 三、递归组件与动态组件
递归组件就是指组件在模板中调用自己，开启递归组件的必要条件，就是设置一个name选项.
实现一个递归组件的必要条件是：
* 要给组件设置name
* 要用一个明确的结束条件
详见src/component/Tree树形控件
### 动态组件
 Vue.js 提供了一个内置的组件 <component> 和 is 特性，可以更好地实现动态组件。
 详见src/component/button组件
 ## 三、form表单组件的设计
 form的slot就是一系列的formitem，formitem的slot就是具体的表单控件
 在form组件中，定义两个props：
 * modal: 表单控件绑定的数据对象
 * rules： 校验规则
 在formitem组件中，也定义两个props：
 * label： 单个表单组件的标签文本
 * props： 对应的表单域from组建model里的字段
 ### 在form中缓存formitem实例
 因为要在 Form 中逐一调用 FormItem 的验证方法，而 Form 和 FormItem 是独立的，需要预先将 FormItem 的每个实例缓存在 Form 中.
 注意，Vue.js 的组件渲染顺序是由内而外的，所以 FormItem 要先于 Form 渲染