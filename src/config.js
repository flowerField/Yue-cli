const fs = require('fs');
const { encode, decode } = require('ini');
const { defaultConfig, configFile } = require('../util/constants.js');

module.exports = (action, k, v) => {
    const o = {};
    if (fs.existsSync(configFile)) {
        // 如果配置文件存在那么就读取并将配置文件解析为对象
        let content = fs.readFileSync(configFile, 'utf8');
        content = decode(content);
        Object.assign(o, c);
    }

    /* 检查命令行具体的操作：get | set */
    if (action === 'get') {
        console.log(o[k] || defaultConfig[k]);
    } else if (action === 'set') {
        o[k] = v;

        // 写文件操作：将内容转化ini格式写入到字符串中
        fs.writeFileSync(configFile, encode(o));
        console.log(`${k}=${v}`);
    } else if (action === 'getVal') {
        return o[k];
    }
}