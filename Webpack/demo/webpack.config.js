const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 条件
        include: [
          path.resolve(__dirname, 'src')  //  匹配特定路径 目录下的才需要经过 babel-loader 处理
        ],
        use: 'babel-loader' // 规则应用结果
      },// 一个 object 即一条规则
      {
        test: /\.less/,
        use: [
          'style-loader', // 直接使用字符串表示 loader
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            },
          }, // 用对象表示 loader，可以传递 loader 配置等
          {
            loader: 'less-loader',
            options: {
              noIeCompt: true
            }// 传递 loader 配置
          }
        ]
      }
    ]
  },

 // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
  },

  plugins: [
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
    })
  ]
}