# restify Boilerplate

restify的样板项目。

## 安装和运行

安装所需库：

```
npm install -dd
```

运行：

```
npm start
```

测试：

```
npm test
```

## 实现的功能

* 针对路由的支持：见`routes`下的示例
* 对跨域访问（CORS）的支持: 见`/app.js`和`/utils/corsHelper.js`
* 对全局配置的支持：配置文件在`/config/global.json`，设置为`global.config`，方便其他文件引用
* 基于`mocha`的自动测试，可在`/test/routes/`下加入自己route的测试代码

## ES6旧版本

以前的版本，见[dev_es6分支](https://github.com/MarshalW/restify-boilerplate/tree/dev_es6)。

放弃这个版本分支的做法，主要是不想编译支持ES6，这样增加项目的复杂度。


