"use strict";

/* 1.安装 axios | npm install axios */

/* 2.导入模块 */
var axios = require('axios');

var ora = require('ora');
/* 封装函数获取存放模板信息的数据 */


function fetchRepositoryList() {
  var _ref, data;

  return regeneratorRuntime.async(function fetchRepositoryList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/orgs/zhu-cli/repos"));

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = function _callee(arg) {
  var task;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("arg", arg);
          /* [ 'vue-simple-template', 'vue-template', 'easy-webpack-demo' ] */

          task = ora("开始请求模板文件...");
          task.start(); // let data = await fetchRepositoryList();
          // // console.log(data);
          // let names = data.map(item => item.name);
          // console.log(names);
          // setTimeout(spinner.succeed, 2000);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};