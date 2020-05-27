"use strict";

/* 1.安装 axios | npm install axios */

/* 2.导入模块 */
var axios = require('axios');

var ora = require('ora');

var inquirer = require('inquirer');
/* 封装函数获取存放模板信息的数据 */


function getRepositoryList() {
  var _ref, data;

  return regeneratorRuntime.async(function getRepositoryList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/orgs/Yong-template/repos"));

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

var getTagList = function getTagList(repo) {
  var _ref2, data;

  return regeneratorRuntime.async(function getTagList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/repos/Yong-template/".concat(repo, "/tags")));

        case 2:
          _ref2 = _context2.sent;
          data = _ref2.data;
          return _context2.abrupt("return", data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = function _callee(arg) {
  var data, names;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("arg", arg);
          /* [ 'vue-simple-template', 'vue-template', 'easy-webpack-demo' ] */
          // let task = ora("开始请求模板文件...");
          // task.start();

          _context3.next = 3;
          return regeneratorRuntime.awrap(getRepositoryList());

        case 3:
          data = _context3.sent;
          console.log("data", data);
          names = data.map(function (item) {
            return item.name;
          });
          console.log("names", names); // setTimeout(spinner.succeed, 2000);
          // let repository = ['vue-simple-template', 'vue-template', 'easy-webpack-demo'];
          // /* 提示选择用来创建项目的模板 */
          // const { repo } = await inquirer.prompt({
          //     name: "repo",
          //     type: "list",
          //     message: "please choice a template to create project !",
          //     choices: names
          // })
          // console.log("repo ->", repo)
          // let tagList = await getTagList(repo);
          // console.log("tagList", tagList)
          // let tags = tagList.map(item => item.tag);
          // /* 提示选择需要的版本 */
          // // let tags = ["1.0.0", "2.0.0", "3.0.1"];
          // const { tag } = await inquirer.prompt({
          //     name: 'tag', // 获取选择后的结果
          //     type: 'list',
          //     message: 'please choices tags to create project',
          //     choices: tags,
          // });
          // console.log("tag ->", tag)

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};