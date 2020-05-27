/* 1.安装 axios | npm install axios */
/* 2.导入模块 */
const axios = require('axios');
const ora = require('ora');
const inquirer = require('inquirer');

/* 封装函数获取存放模板信息的数据 */
async function getRepositoryList() {

    let { data } = await axios.get("https://api.github.com/orgs/Yong-template/repos");
    return data;
}

const getTagList = async(repo) => {
    const { data } = await axios.get(`https://api.github.com/repos/Yong-template/${repo}/tags`);
    return data;
};

module.exports = async(arg) => {
    console.log("arg", arg);

    /* [ 'vue-simple-template', 'vue-template', 'easy-webpack-demo' ] */

    // let task = ora("开始请求模板文件...");
    // task.start();

    let data = await getRepositoryList();
    console.log("data", data);

    let names = data.map(item => item.name);
    console.log("names", names);
    // setTimeout(spinner.succeed, 2000);

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

};