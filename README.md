# restify Boilerplate

restify的样板项目。

## 安装和运行

需要的Node.js版本`v6.2.0`

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
* 基于`Mocha`的自动测试，可在`/test/routes/`下加入自己route的测试代码
* 集成`Winston`日志
* 基于JWT的认证
* 基于[NODE ACL](https://github.com/OptimalBits/node_acl)的ACL

## 功能实用说明

### 配置文件

使用全局配置文件对象：

```javascript
const nconf=require('./config');
```

具体用法，见[nconf](https://github.com/indexzero/nconf)。

使用`npm start`运行的时候，使用`/config/global.dev.json`配置文件。

使用`NODE_ENV=production npm start`运行时，会使用`/config/global.product.json`配置文件。

项目部署的时候，没有`/config/global.product.json`文件，只有`/config/global.product.json.template`文件。部署人员可复制该文件为`/config/global.product.json`，再根据情况修改参数。

`/config/global.product.json`在`.gitignre`中，因此不会被提交到git repository。

### Winston日志

使用默认日志的方式：

```javascript
const logger = require('./utils/logging');
..
logger.info('balabala');
```

使用`npm start`运行的时候，将默认使用`Console`日志。即所有的日志都会打印到终端标准输出上。

使用`NODE_ENV=production npm start`运行时，日志都记录在日志文件中，在终端标准输出不打印。默认的日志文件如下：

 * app.log.YYYY-MM-DD：所有日志都记录到该文件中，json格式。每天1个文件，文件名类似这样：`app.log.2016-05-18`，如果文件超过20MB，会自动再创建新的文件
 * error.log: 记录所有logger.error()的日志，不使用json格式
 * crash.log: 崩溃日志，在服务器系统非正常退出的时候，记录报错相关信息，不使用json格式

自定义日志，在`/app.js`中，可创建自定义日志。在`production`运行环境下记录在文件中，其他情况下使用默认的`Console`日志。

### 跨域访问（CORS）设置

默认情况下，对域名没有限制，使用`*`。

其他情况有时间补充。

### 实现基于JWT的认证

当通过`/auth/signIn`登录时，需要POST传入`userName`和`password`两个参数。比对`password`成功后，会返回类似这样:

```javascript
{
  "results": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDciLCJ1c2VyTmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNDYzNjUzMDM2fQ.3BPAitFhEG4NzEuf62Af8mmy2f83VrhlmELvuxiBN70"
  }
}
```

前端开发者存储`token`，然后在访问需要授权的`url`的时候，在HTTP请求头部加入类似这样:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDciLCJ1c2VyTmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNDYzNjUzMDM2fQ.3BPAitFhEG4NzEuf62Af8mmy2f83VrhlmELvuxiBN70
```
服务器端的中间件/插件，`/plugins/jwtPlugin.js`将对token的签名做校验，对校验出错的情况返回类似这样：

```javascript
{
  "code": "InvalidCredentials",
  "message": ""
}
```

上述方法既适用于Web前端，也适用于iOS/Android。

### ACL

ACL的配置在`/config/global.*.json`中。目前仅支持配置文件ACL，以后可能加入在数据库实现的支持。

实现代码在`/plugins/aclPlugin.js`。

## ES6旧版本

以前的版本，见[dev_es6分支](https://github.com/MarshalW/restify-boilerplate/tree/dev_es6)。

放弃这个版本分支的做法，主要是不想编译支持ES6，这样增加项目的复杂度。
