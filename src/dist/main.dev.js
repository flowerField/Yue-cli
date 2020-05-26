"use strict";

/* 1、引入 commander模块 */
var program = require("commander");
/* 导出 package.json文件中 name和 version 信息 */


var _require = require("../package"),
    name = _require.name,
    version = _require.version;
/* 组织映射结构 */


var actions = {
  create: {
    // 项目创建(初始化)指令
    description: 'create project with Yue-cli',
    alias: 'c',
    examples: ['Yue-cli create <project-name>']
  },
  config: {
    // 设置项目配置文件指令
    description: 'config info',
    alias: 'conf',
    examples: ['Yue-cli config get <k>', 'Yue-cli config set <k> <v>']
  },
  '*': {
    description: 'command not found',
    alias: '',
    examples: []
  }
};
Object.keys(actions).forEach(function (action) {
  program
  /* 命名的名称 */
  .command(action)
  /* 命名的别名 */
  .alias(actions[action].alias)
  /* 命令的描述信息 */
  .description(actions[action].description)
  /* 命令的任务(功能) */
  .action(function () {
    // 动作
    console.log("\u6267\u884C action->", action);
  });
}); // 监听用户的help 事件

program.on('--help', function () {
  console.log('\nExamples:');
  Reflect.ownKeys(actions).forEach(function (action) {
    console.log("-", action);
    actions[action].examples.forEach(function (example) {
      return console.log("  ".concat(example));
    });
  });
});
/* 版本信息 + 命令行参数解析 */

program.version("Yue-cli version = ".concat(version)).parse(process.argv);