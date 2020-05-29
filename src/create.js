/* 1.安装 axios | npm install axios */
/* 2.导入模块 */
const axios = require('axios');
const ora = require('ora');
const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const inquirer = require('inquirer');
const { promisify } = require('util');

let downloadGitRepo = require('download-git-repo');
downloadGitRepo = promisify(downloadGitRepo); /* 把异步 API 转换为 Promise */
const { downloadDirectory } = require('../util/constants.js');

/* 封装函数获取存放模板信息的数据 */
async function getRepositoryList() {
    const { data } = await axios.get("https://api.github.com/orgs/Yong-template/repos");
    return data;
}

const getTagList = async(repo) => {
    // https: //api.github.com/repos/Yong-template/vue-simple-template/tags
    const { data } = await axios.get(`https://api.github.com/repos/Yong-template/${repo}/tags`);
    return data;
};

const loading = (fn, message) => async(...args) => {
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
    return result;
};

const downloadTask = async(repo, tag) => {
    let url = `Yong-template/${repo}`;
    if (tag) url += `#${tag}`
    const dest = `${downloadDirectory}/${repo}`;
    console.log("dest", dest, "url", url);
    await downloadGitRepo(url, dest);
    return dest; // 下载的最终目录
};

module.exports = async(projectName) => {

    let repoList = await loading(getRepositoryList, "fetching template ...")();
    const { repo } = await inquirer.prompt({
        name: "repo",
        type: "list",
        message: "please choice a template to create project !",
        choices: repoList.map(item => item.name)
    })

    let tagList = await loading(getTagList, "fetching tags ...")(repo);

    const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        message: 'please choices tags to create project',
        choices: tagList.map(item => item.name),
    });

    const dest = await loading(downloadTask, "download template ...")(repo, tag);
    console.log("template", dest);

    // console.log("tag ->", tag)
    /* 根据选择的仓库 + 版本号，下载模板文件到当前项目中指定的文件夹 */

    /* dest:/Users/文顶顶/.template/vue-simple-template */
    /* url :Yong-template/vue-simple-template#v1.0.0 */

    /* path.resolve(projectName) 表示在执行指令的当前目录下面创建projectName为名的文件夹 */
    console.log("path.resolve(projectName)", path.resolve(projectName));
    await ncp(dest, path.resolve(projectName));

    if (!fs.existsSync(path.join(dest, 'ask.js'))) {
        await ncp(dest, path.resolve(projectName));
    }
};