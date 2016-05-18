# restify Boilerplate

restify的样板项目。

## 安装和运行

安装所需库：

```
npm install -dd
```

开发环境下运行：

```
npm start
```

生产环境下运行：

```
NODE_ENV=production npm start
```

测试：

```
npm test
```

## 实现的功能

* 针对路由的支持：见`routes`下的示例
* 对跨域访问（CORS）的支持: 见`/app.js`和`/utils/corsHelper.js`
* 对全局配置的支持：配置文件在`/config/global.{dev|product}.json`，设置为`global.config`，方便其他文件引用
* 基于`mocha`的自动测试，可在`/test/routes/`下加入自己route的测试代码
* 集成winston日志

## 功能实用说明

### 配置文件

使用`npm start`运行的时候，使用`/config/global.dev.json`配置文件。

使用`NODE_ENV=production npm start`运行时，会使用`/config/global.product.json`配置文件。

项目部署的时候，没有`/config/global.product.json`文件，只有`/config/global.product.json.template`文件。部署人员可复制该文件为`/config/global.product.json`，再根据情况修改参数。

`/config/global.product.json`在`.gitignre`中，因此不会被提交到git repository。

### winston日志

使用`npm start`运行的时候，将默认使用`Console`日志。即所有的日志都会打印到终端标准输出上。

使用`NODE_ENV=production npm start`运行时，日志都记录在日志文件中，在终端标准输出不打印。默认的日志文件如下：

 * app.log.YYYY-MM-DD：所有日志都记录到该文件中，json格式。每天1个文件，文件名类似这样：`app.log.2016-05-18`，如果文件超过20MB，会自动再创建新的文件
 * error.log: 记录所有logger.error()的日志，不使用json格式
 * crash.log: 崩溃日志，在服务器系统非正常退出的时候，记录报错相关信息，不使用json格式

自定义日志，在`/app.js`中，可创建自定义日志。在`production`运行环境下记录在文件中，其他情况下使用默认的`Console`日志。

### 跨域访问（CORS）设置

默认情况下，对域名没有限制，使用`*`。

其他情况有时间补充。

## ES6旧版本

以前的版本，见[dev_es6分支](https://github.com/MarshalW/restify-boilerplate/tree/dev_es6)。

放弃这个版本分支的做法，主要是不想编译支持ES6，这样增加项目的复杂度。


