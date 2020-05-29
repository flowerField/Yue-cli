
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

[1] 安装模块
npm install commander

[2] 使用模块
/* 1、引入 commander模块 */
const program = require("commander")

/* 导出 package.json文件中 name和 version 信息 */
const { name, version } = require("../package");


/* 组织映射结构 */
const actions = {
    create: { // 项目创建(初始化)指令
        description: 'create project with Yue-cli',
        alias: 'c',
        examples: [
            'Yue-cli create <project-name>',
        ],
    },
    config: { // 设置项目配置文件指令
        description: 'config info',
        alias: 'conf',
        examples: [
            'Yue-cli config get <k>',
            'Yue-cli config set <k> <v>',
        ],
    },
    '*': {
        description: 'command not found',
        alias: '',
        examples: [],
    },
};

Object.keys(actions).forEach((action) => {
    program
    /* 命名的名称 */
        .command(action)
        /* 命名的别名 */
        .alias(actions[action].alias)
        /* 命令的描述信息 */
        .description(actions[action].description)
        /* 命令的任务(功能) */
        .action(() => { // 动作
            console.log(`执行 action->`, action);
        });
});

// 监听用户的help 事件
program.on('--help', () => {
    console.log('\nExamples:');
    Reflect.ownKeys(actions).forEach((action) => {
        console.log("-", action);
        actions[action].examples.forEach((example) => console.log(`  ${example}`));
    });
});

/* 版本信息 + 命令行参数解析 */
program.version(`Yue-cli version = ${version}`).parse(process.argv);

<!-- 第三阶段 实现每个配置参数的动作 譬如 Yue-cli create 应该创建项目-->
关键代码：
<!-- require 加载模块得到的是函数，后面跟上()表示函数调用，并把参数传递给函数。 -->
<!-- 如果是 Yue-cli create xxx 那么就加载 create.js 文件，并传递 xxx 给函数 -->
<!-- 如果是 Yue-cli config ccc 那么就加载 config.js 文件，并传递 ccc 给函数 -->
require(path.resolve(__dirname,action))("xxx");

<!-- 第四阶段 实现 create 初始化项目的命令 -->
<!-- 核心过程 -->
<!-- (1) 通过 npm install axios 安装 axios 以发送网络请求下载初始化项目需要用到的模板文件。 -->
<!-- (2) 封装异步发请求的代码以获取模板信息-->
<!-- (3) 通过 npm install ora 安装 ora 并引入到项目中(作用是显示一些提示信息)  -->
<!-- (4) 封装提函数 -->
<!-- (5) 安装选择模板的 Node 模块 npm install inquirer 并引入-->
<!-- (6) 使用inquirer.prompt({})来交互和选择用来创建项目的模板文件 -->
<!-- (7) 使用inquirer.prompt({})来交互和选择需要的版本信息-->
<!-- (8) 通过 cpn 来下载用户选择的对应版本的模板文件，如果需要渲染那么还需要先动态的融合 -->


<!-- 安装模块-->
npm install download-git-repo   <!-- 下载  git仓库的模块 -->
npm install util                <!-- 内部的 promisify 用于将异步任务转换伪 Promise-->
npm install ncp                 <!-- 安装 ncp 作用是用来拷贝文件(把 A 路径的文件拷贝到 B 路径) -->

主要终端命令
wendingding:Yue-cli wendingding$ Yue-cli 
Usage: Yue-cli [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  create|c        create project with Yue-cli
  config|conf     config info
  *               command not found
  help [command]  display help for command

Examples:
- create
  Yue-cli create <project-name>
- config
  Yue-cli config get <k>
  Yue-cli config set <k> <v>
- *
wendingding:Yue-cli wendingding$ Yue-cli create myApp
执行 action-> create
[ '/usr/local/bin/node',
  '/usr/local/bin/Yue-cli',
  'create',
  'myApp' ]
arg myApp
wendingding:Yue-cli wendingding$ Yue-cli --version
Yue-cli version = 1.0.0
wendingding:Yue-cli wendingding$ Yue-cli --help
Usage: Yue-cli [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  create|c        create project with Yue-cli
  config|conf     config info
  *               command not found
  help [command]  display help for command

Examples:
- create
  Yue-cli create <project-name>
- config
  Yue-cli config get <k>
  Yue-cli config set <k> <v>
- *
wendingding:Yue-cli wendingding$ 