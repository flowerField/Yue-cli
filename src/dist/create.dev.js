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

var loading = function loading(fn, message) {
  return function _callee() {
    var spinner,
        result,
        _args3 = arguments;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            spinner = ora(message);
            spinner.start();
            _context3.next = 4;
            return regeneratorRuntime.awrap(fn.apply(void 0, _args3));

          case 4:
            result = _context3.sent;
            spinner.succeed();
            return _context3.abrupt("return", result);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

module.exports = function _callee2(arg) {
  var repoList, _ref3, repo, tagList, _ref4, tag;

  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(loading(getRepositoryList, "fetching template ....")());

        case 2:
          repoList = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: "repo",
            type: "list",
            message: "please choice a template to create project !",
            choices: repoList.map(function (item) {
              return item.name;
            })
          }));

        case 5:
          _ref3 = _context4.sent;
          repo = _ref3.repo;
          _context4.next = 9;
          return regeneratorRuntime.awrap(loading(getTagList, "fetching tags ....")(repo));

        case 9:
          tagList = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'tag',
            type: 'list',
            message: 'please choices tags to create project',
            choices: tagList.map(function (item) {
              return item.name;
            })
          }));

        case 12:
          _ref4 = _context4.sent;
          tag = _ref4.tag;
          console.log("tag ->", tag);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
};