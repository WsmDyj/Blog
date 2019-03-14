### 前言
高阶组件在React应用中，非常非常重要。空有一个想学好React的心，却没有一个好的教程。希望这篇文章可以帮组到你，把React学的更好。通过这篇文章你可以学到高阶组件的定义及原理、高阶组件在项目中的常见应用、通用高阶组件如何封装以及继承方式高阶组件和代理方式高阶组件。

### 搭建项目
create-react-app myapp创建一个react项目，并在src目录下新建一个components放置组件A、B、C三个组件。![如图](https://user-gold-cdn.xitu.io/2019/3/13/1697640392f5df6e?w=687&h=518&f=png&s=45966)

将A组件作为高阶组件
```
import React, { Component } from 'react'
function A(WrappedComponed) {
  return class A extends Component {
    render() {
      return (
        <div className="a-container">
          <div className="header">
            <div>提示</div>
            <div>x</div>
          </div>
          <div>
            <WrappedComponed />
          </div>
        </div>
      )
    }
  }
}
export default A
```
B组件和C组件作为参数传递给A
```
import React, { Component } from 'react'
import A from './A'
class B extends Component {
  render() {
    return (
      <div>
        這是组件B
       <img src={require('../images/B.png')} alt=""/>
      </div>
    )
  }
}
export default A(B)
```
A组件其实就是一个function,通过接受一个参数返回一个react组件，而接收的参数又是一个组件，这就是一个简单的高阶组件。高阶组件就是接受一个组件作为参数并返回一个新组件的函数，高阶组件是一个函数，并不是一个组件。高阶组件带来的好处是多个组件都需要某个相同的功能，使用高阶组件减少重复的实现，比如我们上述的B/C组件都需要A。最后效果![效果图](https://user-gold-cdn.xitu.io/2019/3/13/169764a09f51b545?w=381&h=240&f=png&s=14613)
### 高阶组件的实现
####  一、编写高阶组件
1. 实现一个普通组件
2. 将普通组件使用函数包裹

####  二、使用高阶组件
1. higherOrderComponent(WrappedComponent)
2. @ higherOrderComponent --装饰器模式

 高阶组件可以看做是装饰器模式(Decorator Pattern)在React的实现。即允许向一个现有的对象添加新的功能，同时又不改变其结构，属于包装模式(Wrapper Pattern)的一种
ES7中添加了一个decorator的属性，使用@符表示，可以更精简的书写。但在create-react-app中并不直接支持，大家可以自行google

创建一个D组件
```
import React, { Component } from 'react'

function d(WrappedComponent) {
  return class D extends Component {
    render() {
      return (
        <div>
          這是高阶组件
          <WrappedComponent />
        </div>
      )
    }
  }
}
export default d
```
使用装饰器@
```
import React, { Component } from 'react'
// import A from './A'
import d from './D'
@d
class B extends Component {
  render() {
    return (
      <div>
        這是组件B
       <img src={require('../images/B.png')} alt=""/>
      </div>
    )
  }
}
export default B
```
效果如下图：![装饰器](https://user-gold-cdn.xitu.io/2019/3/13/16976f6778b2bcd9?w=472&h=332&f=png&s=17679)
如果学到这里大家应该都学会了如何创建和使用高阶组件了，但是高阶组件就是这一点点知识吗？答案肯定是NO，接下来让我们一起看看在实战中是如何应用高阶组件的。
## 高阶组件的应用
### 代理方式的高阶组件
返回的新数组类直接继承React.Component类，新组件扮演的角色传入参数组件的一个代理，在新组件的render函数中，将被包裹组件渲染出来，除了高阶组件自己要做的工作，其余功能全部转手给被包裹的组件。

代理方式的高阶组件主要有以下四个方面的运用:
操纵prop、访问ref、抽取状态、包装组件
#### 操纵prop
修改下A组件,代理方式
```
import React, { Component } from 'react'
export default (title) => WrappedComponent => class A extends Component {
  render() {
    return (
      <div className="a-container">
        <div className="header">
          <div>{title}</div>
          <div>x</div>
        </div>
        <div>
          <WrappedComponent {...this.props}/>
        </div>
      </div>
    )
  }
}
```
在B中添加props:
```
import React, { Component } from 'react'
import A from './A'
class B extends Component {
  render() {
    return (
      <div>
        這是组件B
        <br />
        我的名字叫: {this.props.name}
        我的年龄是： {this.props.age}
       <img src={require('../images/B.png')} alt=""/>
      </div>
    )
  }
}
export default A('提示')(B)
```
![](https://user-gold-cdn.xitu.io/2019/3/13/16977072762e5181?w=399&h=247&f=png&s=18809)
现在我们要做的是通过高阶组件对组件B属性进行修改。我们先添加一个性别组件。我们不在APP.js中通过
> <B name={'张三'} age={'18'} />

这样的方式将性别引入，而是在我们的高阶组件A中进行操作
> <WrappedComponent sex={'男'} {...this.props} />

![高阶组件操纵prop](https://user-gold-cdn.xitu.io/2019/3/13/169770c020fbf45d?w=459&h=270&f=png&s=21778)
上面讲述的是属性的增加，那么属性的删减呢
```
import React, { Component } from 'react'
export default (title) => WrappedComponent => class A extends Component {
  render() {
    const {age, ...otherProps} = this.props
    return (
      <div className="a-container">
        <div className="header">
          <div>{title}</div>
          <div>x</div>
        </div>
        <div>
          <WrappedComponent sex={'男'} {...otherProps} />
        </div>
      </div>
    )
  }
}
```
这样在我们的otherProps中是没有age这个属性的，因此就达到了属性的删减。
#### 访问ref
我们在C组件中定义一个getName方法，
```
 getName() {
    return '我是C组件'
  }
 ```
 但是怎么在高阶组件A中调用到呢？其实i很简单就是在高阶组件中添加ref
 ```
import React, { Component } from 'react'
export default (title) => WrappedComponent => class A extends Component {
  refc(instance) {
    instance.getName && alert(instance.getName())
  } // instanc:WrappedComponent组件的实例
  render() {
    const {age, ...otherProps} = this.props
    return (
      <div className="a-container">
        <div className="header">
          <div>{title}</div>
          <div>x</div>
        </div>
        <div>
          <WrappedComponent sex={'男'} {...otherProps} ref={this.refc.bind(this)} />
        </div>
      </div>
    )
  }
}
```
![操作ref](https://user-gold-cdn.xitu.io/2019/3/13/16977178c18519fb?w=567&h=156&f=png&s=16410)
打印的我是C组件其实就是我们在C组件中定义的getName方法。通过这种方法可以操作任何被包裹组件的方法，甚至操作任何一个DOM。
#### 抽取状态
在B组件中增加一个输入框
```
import React, { Component } from 'react'
import A from './A'
class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  changeInput(e) {
    console.log(e)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div>
        這是组件B
        <input type='text' value={this.state.value} onInput={this.changeInput.bind(this)}/>
        <br />
        我的名字叫: {this.props.name}
        我的年龄是： {this.props.age}
        <br />
        我的性别是： {this.props.sex}
       <img src={require('../images/B.png')} alt=""/>
      </div>
    )
  }
}
export default A('提示')(B)
```
![](https://user-gold-cdn.xitu.io/2019/3/13/1697722584344a60?w=941&h=353&f=png&s=59582)
单个组件的状态书写方式，如果很多组件都需要input，那么就会重复代码，因此我们需要将状态抽离到高阶组件A中。
```
import React, { Component } from 'react'
export default (title) => WrappedComponent => class A extends Component {
  refc(instance) {
    // instance.getName && alert(instance.getName())
  }
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  changeInput= (e) => {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    const { age, ...otherProps } = this.props
    const newProps = {
      value: this.state.value,
      onInput: this.changeInput
    }
    return (
      <div className="a-container">
        <div className="header">
          <div>{title}</div>
          <div>x</div>
        </div>
        <div>
          <WrappedComponent {...newProps} sex={'男'} {...otherProps} ref={this.refc.bind(this)} />
        </div>
      </div>
    )
  }
}
```
在B组件我们接受一个newProps状态
>  <input type='text' {...this.props}/>

回到页面，发现跟上面的是一样，这样我们就将组件的状态抽离出来了,如果C组件需要input，只需要将添加一个input输入框就行了。极大的简化了代码。
### 继承方式的高阶组件
采用继承关联作为参数的组件和返回的组件，加入传入的组件参数是WrappedComponent,那么返回的组件就是直接继承自WrappedComponent


![](https://user-gold-cdn.xitu.io/2019/3/13/169772aeb62e049f?w=555&h=352&f=png&s=112578)
通过代码的对比，我们不难发现代理方式的高阶组件和继承方式的高阶组件的区别：

1. 继承的类不同。代理方式继承的是React的Component,继承方式继承的则是WrappedComponent
2. 返回的方式不同

#### 操纵prop
新建一个E继承高阶组件
```
import React, { Component } from 'react';
const modifyPropsHOC = (WrappedComponent) => class NewComponent extends WrappedComponent {
  render() {
    const element = super.render()
    const newStyle = {
      color: element.type === 'div' ? 'red': 'green'
    }
    const newProps = { ...this.props, style: newStyle }
    return React.cloneElement(element, newProps,element.props.children)
  }
}
export default modifyPropsHOC
```
在F、G组件中使用继承组件
```
import React, { Component } from 'react'
import E from './E'
@E
export default class G extends Component {
  render() {
    return (
      <p>
        我是p
      </p>
    )
  }
}

```
![](https://user-gold-cdn.xitu.io/2019/3/13/169773be78e42ae3?w=356&h=119&f=png&s=2019)
这就是我们通过继承方式的高阶组件来操纵props。高阶组件需要根据参数来渲染组件，不建议使用。
#### 操作生命周期
在G组件中
```
import React, { Component } from 'react'
import E from './E'
@E
export default class G extends Component {
  componentWillMount() {
    alert('我是原始生命周期')
  }
  render() {
    return (
      <p>
        我是p
      </p>
    )
  }
}
```
在继承高阶组件E中修改G中的属性
```
import React, { Component } from 'react';
const modifyPropsHOC = (WrappedComponent) => class NewComponent extends WrappedComponent {
  componentWillMount() {
    alert('我是更改生命周期')
  }
  render() {
    const element = super.render()
    const newStyle = {
      color: element.type === 'div' ? 'red': 'green'
    }
    const newProps = { ...this.props, style: newStyle }
    return React.cloneElement(element, newProps,element.props.children)
  }
}
export default modifyPropsHOC
```
![](https://user-gold-cdn.xitu.io/2019/3/13/1697742286a77773?w=459&h=136&f=png&s=10541)
### 总结
高阶组件最大的好处就是解耦和灵活性，在react的开发中还是很有用的。
当然这不可能是高阶组件的全部用法。掌握了它的一些技巧，还有一些限制，你可以结合你的应用场景，发散思维，尝试一些不同的用法。

