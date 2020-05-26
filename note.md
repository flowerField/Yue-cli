
<!-- 第一阶段：让 Yue-cli 可用 -->
1、初始化环境
npm init -y                         # 初始化package.json
npm install eslint husky --save-dev # eslint是负责代码校验工作,husky提供了git钩子功能
npx eslint --init                   # 初始化eslint配置文件，用于语法检查

2、目录结构
```bash
.
├── bin
│   └── www            <!-- 全局命令执行的根文件 -->
├── node_modules       <!-- 安装的包文件 -->
│   ├── @babel
│   ...
│   └── yaml
├── package-lock.json
├── package.json       <!-- 元信息文件 -->
├── src       
│   └── main.js        <!-- 项目入口文件 -->
│── .huskyrc           <!-- git hook -->
│── .eslintrc.json     <!-- 代码规范校验文件 -->
└── util
    └── constants.js   <!-- 该文件用于存放公共常量数据 -->
```

3、配置
```bash
"scripts": {
    "lint":"eslint src"
}
"bin": {
       "vito-cli": "./bin/www"
   }
```
4、编辑 www 文件
```bash
#! /usr/bin/env node
require('../src/main.js');
```

5、链接让终端命令有效
```
npm link
```

<!-- 第二阶段 让 Yue-cli 拥有help等配置项 -->
1、安装模块
npm install commander

2、引入模块并使用
const program = require("commander")
program.version('1.0.1').parse(process.argv);



