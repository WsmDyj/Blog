## 动态路由
所谓动态路由，就是说路由规则不是固定的.在 <font color=#ff502c>react-router-dom</font> 的官方教程中，一共给出12个示例，但是个人认为，着12个示例看着真的很累人，很多写法，不是标准的企业项目应用的写法，所以针对这个现状，我想用企业项目开发的要求，对教程中的每一个示例进行重写，这篇教程就是它的第一个示例——基本使用和介绍。
## HashRouter还是BrowserRouter
<font color=#ff502c>react-router</font> 的工作方式，是在组件树顶层放一个Router组件，然后在组件树中散落着很多reactr
组件,顶层的Router组件负责分析监听URL的变化，在它保护伞之下的Route组件可以直接读取这些信息。

很明显，Router和Route的配合，就是之前我们介绍过的"提供者模式"，Routershi 
"提供者"，Route是"消费者"。

Router其实也是一层抽象，让下面的Route无需各种不同URL设计的细节，不要以为
URL就一种设计方法，至少可以分为两种。

第一种：比如 / 对应Home页， /about对应About页，但是这样的设计需要服务器端渲染，
应为用户可以直接访问任何一个URL，服务器必须能对 / 的访问返回HTML， 也要对 /about 的访问返回HTML。

第二种：只有一个路径 / ,通过URL后面的 # 部分来决定路由， /#/ 对应Home页
/#/about 对应About页。应为URL种 # 之后的部分是不会发送给服务器的，所以，
无论哪个URL，最后都是访问服务器的 / 路径，服务器也只需要返回同一份HTNL就可以，然后由浏览器端解析 # 后的部分
，完成浏览器端渲染。
## 组件
### <BrowserRouter> 
一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。此组件拥有以下属性：
* basename: string 
为所有位置添加一个基准URL.
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。
```
<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```
* getUserConfirmation: func 
导航到此页面前执行的函数，默认使用 window.confirm
使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
```
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}
<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```
* forceRefresh: bool
作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
使用场景：同上。
```
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```
* keyLength: number
作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
使用场景：按需设置。
```
<BrowserRouter keyLength={12} />
```

最后展示实例：
```
<BrowserRouter
  basename="/minooo"
  forceRefresh={false}
  getUserConfirmation={getConfirmation()}
  keyLength={12}
></BrowserRouter>
```
### <Route>
<Route> 自带三个 render method 和三个 props 。
render methods 分别是：
* <Route component>
* <Route render>
* <Route children>
props 分别是：
* match
* location
* history
所有的 render method 无一例外都将被传入这些 props。
#### component
只有当访问地址和路由匹配时，一个 React component 才会被渲染，此时此组件接受 route props (match, location, history)。

当使用component时，router将使用React.createElement根据给定的Component创建
一个新的React元素。这意味着如果你使用内联函数传值给component将会产生不必要的重复装载。对于内联渲染（inline rendering）, 建议使用 render prop。
```
<Route path="/user/:username" component={User} />
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```
#### <Link>
to: string
作用：跳转到指定路径
使用场景：如果只是单纯的跳转就直接用字符串形式的路径。
> <Link to="/courses" />

to: object
作用：携带参数跳转到指定路径
作用场景：比如你点击的这个链接将要跳转的页面需要展示此链接对应的内容，又比如这是个支付跳转，需要把商品的价格等信息传递过去。
```
<Link to={{
  pathname: '/course',
  search: '?sort=name',
  state: { price: 18 }
}} />
```
#### <NavLink>
这是 <Link> 的特殊版，顾名思义这就是为页面导航准备的。因为导航需要有 “激活状态”。

activeClassName: string
导航选中激活时候应用的样式名，默认样式名为 active
```
<NavLink
  to="/about"
  activeClassName="selected"
>MyBlog</NavLink>
```
#### <Switch>
只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。

#### Prompt
当用户离开当前页面前做出一些提示。
* message: string
当用户离开当前页面时，设置的提示信息。
> <Prompt message="确定要离开？" />

* message: func
当用户离开当前页面时，设置的回掉函数
```
<Prompt message={location => (
  `Are you sue you want to go to ${location.pathname}?` 
)} />
```
* when: bool
通过设置一定条件要决定是否启用 Prompt

```
<Prompt 
  when={this.state.dirty} 
  message="数据尚未保存，确定离开？" />
```
## 对象和方法
### match
match 对象包含了 <Route path> 如何与 URL 匹配的信息，具有以下属性：
* params: object 路径参数，通过解析 URL 中的动态部分获得键值对
* isExact: bool 为 true 时，整个 URL 都需要匹配
* path: string 用来匹配的路径模式，用于创建嵌套的 <Route>
* url: string URL 匹配的部分，用于嵌套的 <Link>
在以下情境中可以获取 match 对象
* 在 Route component 中，以 this.props.match获取
* 在 Route render 中，以 ({match}) => () 方式获取
* 在 Route children 中，以 ({match}) => () 方式获取
* 在 withRouter 中，以 this.props.match的方式获取
* matchPath 的返回值
### location
location 是指你当前的位置，将要去的位置，或是之前所在的位置

在以下情境中可以获取 location 对象

* 在 Route component 中，以 this.props.location 获取
* 在 Route render 中，以 ({location}) => () 方式获取
* 在 Route children 中，以 ({location}) => () 方式获取
* 在 withRouter 中，以 this.props.location 的方式获取
location 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用
```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```
可以在不同情境中使用 location：
* <Link to={location} />
* <NaviveLink to={location} />
* <Redirect to={location />
* history.push(location)
* history.replace(location)

### history
history 对象是可变的，因为建议从 <Route> 的 prop 里来获取 location，而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的钩子函数正常执行，例如以下代码：
```
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged
    const locationChanged = nextProps.location !== this.props.location

    // 错误方式，locationChanged 永远为 false，因为history 是可变的
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}
```
### 最后实现的一个简单完整的react-router
```
import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home/Home'
class App extends Component {
  render() {
    const About = ( ) => <h1>About</h1>;
    const Nested = () => (
      <div>
        <Link to="/nested/one">One</Link>
        <Link to="/nested/two">Two</Link>
        <Link replace to="/nested/Three">Three</Link>
        <div>选择一个点击</div>
        <Route path="/nested/:minooo?" render={({match}) => <h2>URL: {match.params.minooo || 'minooo'}</h2>} />
      </div>
    )
    return (
      <div className="App">
        <Router>
          <Link to="/">Home</Link>
          <Link to={{ pathname: '/about',search:'?sort=name', state:{ price: 18 } }}>About</Link>
          <Link to="/contact/12?name=minooo">Contact</Link>
          <Link to="/blog">blog</Link>
          <Link to="/nested">Nested</Link>
          {/* <NavLink to="/about" activeClassName="active">MyBlog</NavLink> */}
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            <Route path="/contact/:id" render={({ history, location, match }) =>
              <h1>
                {console.log(history, location, match)}
                <span onClick={() => {history.push('/', {name:'mm'})}}>click me</span>
              </h1>} />
              <Route path="/blog" children={({ match }) => (
                <li className={match?'active': ''}>
                  <Link to="/">User</Link>
                </li>
            )} />
              <Route path="/nested" render={Nested} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
            </main>
        </Router>
      </div>
    );
  }
}
export default App;

```
## 结束