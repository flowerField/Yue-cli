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

var MetalSmith = require('metalsmith');

var render = require('consolidate').ejs.render;
/* 模板引擎 */


render = promisify(render);

var downloadGitRepo = require('download-git-repo');

downloadGitRepo = promisify(downloadGitRepo);
/* 把异步 API 转换为 Promise */

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
          if (tag) url += "#".concat(tag);
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

module.exports = function _callee4(projectName) {
  var repoList, _ref3, repo, tagList, _ref4, tag, dest;

  return regeneratorRuntime.async(function _callee4$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(loading(getRepositoryList, "fetching template ...")());

        case 2:
          repoList = _context7.sent;
          _context7.next = 5;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: "repo",
            type: "list",
            message: "please choice a template to create project !",
            choices: repoList.map(function (item) {
              return item.name;
            })
          }));

        case 5:
          _ref3 = _context7.sent;
          repo = _ref3.repo;
          _context7.next = 9;
          return regeneratorRuntime.awrap(loading(getTagList, "fetching tags ...")(repo));

        case 9:
          tagList = _context7.sent;
          _context7.next = 12;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'tag',
            type: 'list',
            message: 'please choices tags to create project',
            choices: tagList.map(function (item) {
              return item.name;
            })
          }));

        case 12:
          _ref4 = _context7.sent;
          tag = _ref4.tag;
          _context7.next = 16;
          return regeneratorRuntime.awrap(loading(downloadTask, "download template ...")(repo, tag));

        case 16:
          dest = _context7.sent;
          console.log("template", dest); // console.log("tag ->", tag)

          /* 根据选择的仓库 + 版本号，下载模板文件到当前项目中指定的文件夹 */

          /* dest:/Users/文顶顶/.template/vue-simple-template */

          /* url :Yong-template/vue-simple-template#v1.0.0 */

          /* path.resolve(projectName) 表示在执行指令的当前目录下面创建projectName为名的文件夹 */

          console.log("path.resolve(projectName)", path.resolve(projectName));
          _context7.next = 21;
          return regeneratorRuntime.awrap(ncp(dest, path.resolve(projectName)));

        case 21:
          if (fs.existsSync(path.join(dest, 'render.js'))) {
            _context7.next = 26;
            break;
          }

          _context7.next = 24;
          return regeneratorRuntime.awrap(ncp(dest, path.resolve(projectName)));

        case 24:
          _context7.next = 28;
          break;

        case 26:
          _context7.next = 28;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            MetalSmith(__dirname) // 如果你传入路径 他默认会遍历当前路径下的src文件夹
            .source(dest).destination(path.resolve(projectName)).use(function _callee2(files, metal, done) {
              var args, obj, meta;
              return regeneratorRuntime.async(function _callee2$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      args = require(path.join(dest, 'render.js'));
                      _context5.next = 3;
                      return regeneratorRuntime.awrap(inquirer.prompt(args));

                    case 3:
                      obj = _context5.sent;
                      meta = metal.metadata();
                      Object.assign(meta, obj);
                      delete files['render.js'];
                      done();

                    case 8:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            }).use(function (files, metal, done) {
              var obj = metal.metadata();
              Reflect.ownKeys(files).forEach(function _callee3(file) {
                var content;
                return regeneratorRuntime.async(function _callee3$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!(file.includes('js') || file.includes('json'))) {
                          _context6.next = 7;
                          break;
                        }

                        content = files[file].contents.toString(); // 文件的内容

                        if (!content.includes('<%')) {
                          _context6.next = 7;
                          break;
                        }

                        _context6.next = 5;
                        return regeneratorRuntime.awrap(render(content, obj));

                      case 5:
                        content = _context6.sent;
                        files[file].contents = Buffer.from(content); // 渲染

                      case 7:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              });
              done();
            }).build(function (err) {
              if (err) {
                reject();
              } else {
                resolve();
              }
            });
          }));

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  });
};