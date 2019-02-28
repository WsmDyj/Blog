### webpack详解
webpack是一个打包工具，他的宗旨是一切静态资源即可打包。有人就会问为什么要webpack？webpack是现代前端技术的基石，常规的开发方式，比如jquery,html,css静态网页开发已经落后了。现在是MVVM的时代，数据驱动界面。webpack将现代js开发中的各种新型有用的技术，集合打包。webpack的描述铺天盖地，我就不浪费大家的时间了。理解下这种图就知道webpack的生态圈了:
![webpack](https://user-gold-cdn.xitu.io/2018/7/12/1648c5f3f744e2dd?w=750&h=787&f=jpeg&s=96053)

### webpack4.0的配置
```
const path = require('path');  //引入node的path模块
const webpack = require('webpack'); //引入的webpack,使用lodash
const HtmlWebpackPlugin = require('html-webpack-plugin')  //将html打包
const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来  
const CopyWebpackPlugin = require('copy-webpack-plugin')
// console.log(path.resolve(__dirname,'dist')); //物理地址拼接
module.exports = {
    entry: './src/index.js', //入口文件  在vue-cli main.js
    output: {       //webpack如何输出
        path: path.resolve(__dirname, 'dist'), //定位，输出文件的目标路径
        filename: '[name].js'
    },
    module: {       //模块的相关配置
        rules: [     //根据文件的后缀提供一个loader,解析规则
            {
                test: /\.js$/,  //es6 => es5 
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // exclude:[], 不匹配选项（优先级高于test和include）
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    'css-loader',
                    'less-loader'
                    ]
                })
            },
            {       //图片loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader' //根据文件地址加载文件
                    }
                ]
            }
        ]                  
    },
    resolve: { //解析模块的可选项  
        // modules: [ ]//模块的查找目录 配置其他的css等文件
        extensions: [".js", ".json", ".jsx",".less", ".css"],  //用到文件的扩展名
        alias: { //模快别名列表
            utils: path.resolve(__dirname,'src/utils')
        }
    },
    plugins: [  //插进的引用, 压缩，分离美化
        new ExtractTextPlugin('[name].css'),  //[name] 默认  也可以自定义name  声明使用
        new HtmlWebpackPlugin({  //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
            file: 'index.html', //打造单页面运用 最后运行的不是这个
            template: 'src/index.html'  //vue-cli放在跟目录下
        }),
        new CopyWebpackPlugin([  //src下其他的文件直接复制到dist目录下
            { from:'src/assets/favicon.ico',to: 'favicon.ico' }
        ]),
        new webpack.ProvidePlugin({  //引用框架 jquery  lodash工具库是很多组件会复用的，省去了import
            '_': 'lodash'  //引用webpack
        })
    ],
    devServer: {  //服务于webpack-dev-server  内部封装了一个express 
        port: '8080',
        before(app) {
            app.get('/api/test.json', (req, res) => {
                res.json({
                    code: 200,
                    message: 'Hello World'
                })
            })
        }
    }
    
}
```
### 一、前端环境搭建
我们使用npm或yarn来安装webpack
```
npm install webpack webpack-cli -g 
# 或者 
yarn global add webpack webpack-cli
```
为什么[webpack](https://www.webpackjs.com/concepts/)会分为两个文件呢？在webpack3中，webpack本身和它的cli以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。

新建一个webpack的文件夹，在其下新建一个try-webpack(防止init时项目名和安装包同名)并初始化和配置webpack。
```
 npm init -y  //-y 默认所有的配置
 yarn add webpack webpack-cli -D  //-D webpack安装在devDependencies环境中
 ```
### 二、部署webpack
在上面搭建好的环境项目中，我们来到package.json里配置我们的scripts,让webpack
```
  "scripts": {
    "build": "webpack --mode production" //我们在这里配置，就可以使用npm run build 启动我们的webpack
  },
  "devDependencies": {
    "webpack": "^4.16.0",
    "webpack-cli": "^3.0.8"
  }
  ```
  配置好我们webpack的运行环境时，联想下vue-cli。平时使用vue-cli会自动帮我们配置并生成项目。我们在src下进行项目的开发，最后npm run build 打包生成我们的dist的目录。不知道你是否还记得，还是让我们进入下一节让我们感受下这其中的正个流程吧。

### 三、npm run build 发生了什么
  在我们的根项目下try-webpack新建一个src目录。在src目录下新建一个index.js文件。在里面我们可以写任意的代码，以案例为主:
  > const a = 1;
  
  写完之后我们在终端运行我们的命令 npm run build；你就会发现新增了一个dist目录，里面存放着webpack打包好的main.js文件。这和我们在vue-cli里操作是一样的。
### 四、webpackp配置流程篇
  我们在开发是一般会打包src下的什么文件呢？我们可以回忆一下，其实vue-cli项目src下不就这几点嘛：
  * 发布时需要的html，css，js
  * css预编译器stylus，less，sass
  * es6的高级语法
  * 图片资源.png，.gif，.ico，.jpg
  * 文件间的require
  * 别名@等修饰符
  
那么我将会分这几点来讲解webpack中webpack.config.js的配置，跟着脚步，一步一步的来完成我们的流程线。
#### ✍️Html在webpack中的配置
在项目的根目录try-webpack下新建webpack.config.js文件，以commonJS模块化机制向外输出,并且新建一个index.html。
> module.exports = {}

配置我们的入口entry，在vue-cli里相当于跟目录下的main.js，我们的出口output。我们可以把webpack理解为一个工厂，进入相当于把各种各样的原料放进我们的工厂了，然后工厂进行一系列的打包操作把打包好的东西，向外输出，然后就可以去出售了(上线)。
```
const path = require('path'); //引入我们的node模块里的path
//测试下 console.log(path.resolve(__dirname,'dist')); //物理地址拼接
module.exports = {
    entry: './src/index.js', //入口文件  在vue-cli main.js
    output: {       //webpack如何向外输出
        path: path.resolve(__dirname, 'dist'),//定位，输出文件的目标路径
        filename: '[name].js' //文件名[name].js默认，也可自行配置
    },
 ```
 HTML打包我们需要安装引入html-webpack-plugin
 ```
 yarn add html-webpack-plugin -D //在开发环境中安装
 const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入打包我们的HTML
 ```
 
在module.exports里配置我们的plugins(插件):
```
 plugins: [  //插进的引用, 压缩，分离美化
        new HtmlWebpackPlugin({  //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
            file: 'index.html', //打造单页面运用 最后运行的不是这个
            template: 'src/index.html'  //vue-cli放在跟目录下
        }),
    ],
```

配置好后，在终端输入npm run dev后webpack将我们的html打包好并且自动将我们的js引进来了。
```
<body>
    <p class="main">Hello World</p>
<script type="text/javascript" src="main.js"></script>
</body>
```
live-sever我们的dist目录，启动一个8080端口，我们就可以看到我们的Hello World了。这就是我们上线版的页面。

#### 🍉css在webpack中的配置
在我们vue-cli里，我们可以使用css去写我们的样式，也可以使用高级stylus，less，sass等预编译器。这里就以less为例，看看webpack怎么将他打包成一个css。
```
.main {
  color: red;
}
```

在src目录下新建我们的style.less文件，在配置之前我们需要npm我们的css-loader和sass-loader， sass
> yarn add css-loader less less-loader style-loader -D

执行完上述命令我们在packge.json里可以看到我们的配置文件
```
 "devDependencies": {
    "css-loader": "^1.0.0",
    "html-webpack-plugin": "^3.2.0",
    "sass": "^1.9.0",
    "sass-loader": "^7.0.3",
    "webpack": "^4.16.0",
    "webpack-cli": "^3.0.8"
  }
  ```
  安装好后，我们开始配置webpack.config.js文件。这里申明一下，我们的css在dist目录下需要和我们的HTML分离，这是还需引入我们的extract-text-webpack-plugin，先然我们安装下
  > yarn add extract-text-webpack-plugin -D
  
  这里有一个坑，extract-text-webpack-plugin在4.0并不支持这样的安装，大家可自行chrome。于是我们选择换一种方式,选择4.00-beta.0版本的
  >  yarn add extract-text-webpack-plugin@last -D
  
  
  来到我们的module.exports里，完成moudel的配置
  ```
  const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来  
   module: {       //模块的相关配置
        rules: [     //根据文件的后缀提供一个loader,解析规则
            {
                test: /\.less$/, //正则匹配我们以.less结尾的文件
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    'css-loader',
                    'less-loader'
                    ]
                })
            },
        ]},
     plugins：[
        new ExtractTextPlugin('[name].css'),  //[name] 默认  也可以自定义name  声明使用
     ]
  ```
  我们在执行我们的npm run build之后并没有我们的css,为什么呢？原来在webpack配置里css in js。意思是在打包是我们的css是打包在我们的js里的，所有我们引入了extract-text-webpack-plugin插件将css从里面剥离出来。不过又一个问题，require的机制？
  
 > 在我们打包过程中，文件的引用require 按照顺序来打包，这就是文件依赖的机制。
 
 打包好后我们在live-server，发现我们的样式也上去了，并且css部分分离出来了。
 
#### 🍊js在webpack中的配置
现在随着es6的普及，越来越多的代码使用es6了，但是很多浏览器并不支持es6,比如async/awiat，const。因此需要我们引用babe来把我们es6的代码编译为es5。在跟目录下新建.babelrc,简单配置下
> {"presets": ["env"]}

安装我们的babel并在webpack.config.js里module/rules下进行配置
```
yarn add babel-loader babel-core  abel-preset-env -D  //babel基本的三个文件
 {
    test: /\.js$/,  //es6 => es5 
    include: [
        path.resolve(__dirname, 'src')
    ],
    // exclude:[], 不匹配选项（优先级高于test和include）
    use: 'babel-loader'
},
```
#### 🥕图片资源在webpack中的配置
在src目录下新建一个assets文件，里面放置几张图片。安装file-loader根据文件地址加载文件
> yarn add file-loader -D
在webpack.config.js里module/rules
```
 {  
    test: /\.(png|jpg|gif)$/, //匹配所有格式的图片资源
    use: [
        {
            loader: 'file-loader' 
        }
    ]
}
```

#### 🍌别名(@)在webpack中的配置
在src/index.js里我们引入
```
const format = require('utils/format')  // utils ?  没有相对路径  回想@  => 别名
在src新建相应的文件。在format.js里接受一个参数并把它转成大写
module.exports = function format(chars) {
    return chars.toUpperCase()
}

```
在webpack中如何配置我们的别名呢？在vue-cli中我们经常@一个文件夹，其意思就是在src目录下，现在我们去一探究竟。在module下,注意跟rules同级
```
 resolve: { //解析模块的可选项  
        // modules: [ ]//模块的查找目录 配置其他的css等文件
        extensions: [".js", ".json", ".jsx",".less", ".css"],  //用到文件的扩展名
        alias: { //模快别名列表
            utils: path.resolve(__dirname,'src/utils')
        }
    },
```

#### 🍒其他一些静态资源在webpack中的配置
* src下其他的文件直接复制到dist目录下，并不是每个文件都需要打包处理的，很多资源可能直接就可以复制过去。使用我们的 CopyWebpackPlugin插件
* 引用框架 jquery  lodash工具库是很多组件会复用的，省去了import。使用webpack.ProvidePlugin插件
### 五、npm run dev 发生了什么 
在vue-cli中我们启动监听npm run dev可以时时监控我们src下文件的改动，那他到底发生了什么呢。在webpack里其实创建了一个node进程，通过webpack-dev-server其内部封装了一个node的express模块,其配置项如下
```
"scripts": { //在package.json里声明下使用脚本 npm run dev
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development"
  }, 
devServer: {  //在webpack.config.js里配置port
        port: '8080',
        before(app) {
            app.get('/api/test.json', (req, res) => {
                res.json({
                    code: 200,
                    message: 'Hello World'
                })
            })
        }
    }  //服务于webpack-dev-server  内部封装了一个express 
```