## Babel 配置
.babelrc 作为Babel的配置文件，最核心的两部分就是presets 以及 plugins。
* presets 代表了Babel配置的核心部分。其中babel-preset-env整合了es2015、es2016、es2017
三个原先独立的preset,开发者只需要映入env这样的preset就可以安全地使用上述三个版本中包含的JavaScript新特新。
* plugins 更像是对presets的一个补充，供开发者去自定义一些presets之外的功能，其中比较常用的如对象的扩展符... 就需要引入babel-plugin-transform-object-rest-spread 开启。
Babel 作为一个基于插件系统打造的 JavaScript 编译工具，其可定制度是非常高的，开发者们完全可以根据自己的使用需要与编码习惯去选择或开发合适的插件以达到提升开发效率的效果。