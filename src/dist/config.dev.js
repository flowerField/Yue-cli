"use strict";

var fs = require('fs');

var _require = require('ini'),
    encode = _require.encode,
    decode = _require.decode;

var _require2 = require('../util/constants.js'),
    defaultConfig = _require2.defaultConfig,
    configFile = _require2.configFile;

module.exports = function (action, k, v) {
  var o = {};

  if (fs.existsSync(configFile)) {
    // 如果配置文件存在那么就读取并将配置文件解析为对象
    var content = fs.readFileSync(configFile, 'utf8');
    content = decode(content);
    Object.assign(o, c);
  }
  /* 检查命令行具体的操作：get | set */


  if (action === 'get') {
    console.log(o[k] || defaultConfig[k]);
  } else if (action === 'set') {
    o[k] = v; // 写文件操作：将内容转化ini格式写入到字符串中

    fs.writeFileSync(configFile, encode(o));
    console.log("".concat(k, "=").concat(v));
  } else if (action === 'getVal') {
    return o[k];
  }
};