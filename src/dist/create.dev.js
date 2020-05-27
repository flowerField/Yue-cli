"use strict";

/* 1.安装 axios | npm install axios */

/* 2.导入模块 */
var axios = require('axios');

var ora = require('ora');

var fs = require('fs');

var ncp = require('ncp');

var path = require('path');

var inquirer = require('inquirer');

var _require = require('util'),
    promisify = _require.promisify;

var downloadGitRepo = require('download-git-repo');

downloadGitRepo = promisify(downloadGitRepo);
/* 把异步 API 转换伪 Promise */

var _require2 = require('../util/constants.js'),
    downloadDirectory = _require2.downloadDirectory;
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

var downloadTask = function downloadTask(repo, tag) {
  var url, dest;
  return regeneratorRuntime.async(function downloadTask$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "Yong-template/".concat(repo);
          if (tag) url += "#".concat(tag); // /user/xxxx/.template/repo

          dest = "".concat(downloadDirectory, "/").concat(repo);
          console.log("dest", dest, "url", url);
          _context4.next = 6;
          return regeneratorRuntime.awrap(downloadGitRepo(url, dest));

        case 6:
          return _context4.abrupt("return", dest);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = function _callee2(projectName) {
  var repoList, _ref3, repo, tagList, _ref4, tag, dest;

  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(loading(getRepositoryList, "fetching template ...")());

        case 2:
          repoList = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: "repo",
            type: "list",
            message: "please choice a template to create project !",
            choices: repoList.map(function (item) {
              return item.name;
            })
          }));

        case 5:
          _ref3 = _context5.sent;
          repo = _ref3.repo;
          _context5.next = 9;
          return regeneratorRuntime.awrap(loading(getTagList, "fetching tags ...")(repo));

        case 9:
          tagList = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'tag',
            type: 'list',
            message: 'please choices tags to create project',
            choices: tagList.map(function (item) {
              return item.name;
            })
          }));

        case 12:
          _ref4 = _context5.sent;
          tag = _ref4.tag;
          _context5.next = 16;
          return regeneratorRuntime.awrap(loading(downloadTask, "download template ...")(repo, tag));

        case 16:
          dest = _context5.sent;
          console.log("template", dest); // console.log("tag ->", tag)

          /* 根据选择的仓库 + 版本号，下载模板文件到当前项目中指定的文件夹 */

          /* dest:/Users/文顶顶/.template/vue-simple-template */

          /* url :Yong-template/vue-simple-template#v1.0.0 */

          console.log("path.resolve(projectName)", path.resolve(projectName));

          if (fs.existsSync(path.join(dest, 'ask.js'))) {
            _context5.next = 22;
            break;
          }

          _context5.next = 22;
          return regeneratorRuntime.awrap(ncp(dest, path.resolve(projectName)));

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  });
};