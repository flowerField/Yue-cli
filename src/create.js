/* 1.安装 axios | npm install axios */
/* 2.导入模块 */
const axios = require('axios');
const ora = require('ora');

/* 封装函数获取存放模板信息的数据 */
async function fetchRepositoryList() {

    let { data } = await axios.get("https://api.github.com/orgs/zhu-cli/repos");
    return data;
}

module.exports = async(arg) => {
    console.log("arg", arg);

    /* [ 'vue-simple-template', 'vue-template', 'easy-webpack-demo' ] */

    let task = ora("开始请求模板文件...");
    task.start();

    // let data = await fetchRepositoryList();
    // // console.log(data);
    // let names = data.map(item => item.name);
    // console.log(names);
    // setTimeout(spinner.succeed, 2000);
};