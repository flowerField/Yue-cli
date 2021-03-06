/* 1、引入 commander模块 */
const path = require('path');
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
            console.log(process.argv);

            /* 示例：Yue-cli create xxx 命令的参数分布： [node,zhu-cli,create,xxx] */
            /* 
            [ '/usr/local/bin/node',
              '/usr/local/bin/Yue-cli',
              'create',
              'xxx' 
            ]
            */
            /* 加载并执行 create.js 文件中的代码，arg打印的值就是 xxx */
            /* 
            module.exports = async(arg) => {
                console.log("arg", arg);
            };
            */
            require(path.resolve(__dirname, action))(...process.argv.slice(3));
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