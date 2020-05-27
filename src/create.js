/* 1.安装 axios | npm install axios */
/* 2.导入模块 */
const axios = require('axios');
const ora = require('ora');
const inquirer = require('inquirer');

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

module.exports = async(arg) => {

    let repoList = await loading(getRepositoryList, "fetching template ....")();
    const { repo } = await inquirer.prompt({
        name: "repo",
        type: "list",
        message: "please choice a template to create project !",
        choices: repoList.map(item => item.name)
    })

    let tagList = await loading(getTagList, "fetching tags ....")(repo);

    const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        message: 'please choices tags to create project',
        choices: tagList.map(item => item.name),
    });

    console.log("tag ->", tag)

};