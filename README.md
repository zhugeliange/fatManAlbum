- **react** 做的一个相册

[项目演示地址](http://www.fsociety.cn:3000/)

- 关于这个脚手架的介绍 [戳这里](https://github.com/zhugeliange/react-environment)

**项目src目录介绍：**

- **components** ： 项目的各种组件，每个目录下的 **js** 都是用 **jsx** 写的 **react** 的模块，并配有相应的同名 **scss** 样式文件。

	- **App** ： 核心组件，加载图片组件和控制条组件，并加载 **data.json** 数据

	- **ContentPage** ： 整个页面底层组件

	- **ControllerUnit** ： 控制条组件

	- **ImageFigure** ： 照片组件

	- **Link** ： 链接组件

	- **TextBox** ： 文本组件

*以上是项目用到的，还有一些例如Feedback这些组件是脚手架自带的，我这里没有用到，根据自己情况来吧。*

**项目运行流程：** 当 **start** 运行项目时，会首先 **clean** 旧的无用的代码包，然后根据 **webpack.config.js** 里面的配置进行 **eslint** 代码检查，各种静态资源的压缩，将 **scss** 转成 **css**，**es6** 用 **babel** 转成 普通 **js**， 解析 **jade** 模板，将 **react** 的各个模块组合在一起，最后打包发布。