"use strict";

/* 1.安装 axios | npm install axios */

/* 2.导入模块 */
var axios = require('axios');

var ora = require('ora');

var inquirer = require('inquirer');
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
  var repository, _ref2, repo, tags, _ref3, tag;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("arg", arg);
          /* [ 'vue-simple-template', 'vue-template', 'easy-webpack-demo' ] */
          // let task = ora("开始请求模板文件...");
          // task.start();
          // let data = await fetchRepositoryList();
          // // console.log(data);
          // let names = data.map(item => item.name);
          // console.log(names);
          // setTimeout(spinner.succeed, 2000);

          repository = ['vue-simple-template', 'vue-template', 'easy-webpack-demo'];
          /* 提示选择用来创建项目的模板 */

          _context2.next = 4;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: "repo",
            type: "list",
            message: "please choice a template to create project !",
            choices: repository
          }));

        case 4:
          _ref2 = _context2.sent;
          repo = _ref2.repo;
          console.log("repo ->", repo);
          /* 提示选择需要的版本 */

          tags = ["1.0.0", "2.0.0", "3.0.1"];
          _context2.next = 10;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'tag',
            // 获取选择后的结果
            type: 'list',
            message: 'please choices tags to create project',
            choices: tags
          }));

        case 10:
          _ref3 = _context2.sent;
          tag = _ref3.tag;
          console.log("tag ->", tag);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};