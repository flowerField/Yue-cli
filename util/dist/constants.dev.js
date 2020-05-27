"use strict";

// 存储模板的位置
var downloadDirectory = "".concat(process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'], "/.template");
module.exports = {
  downloadDirectory: downloadDirectory
};