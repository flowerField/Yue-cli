/* 1.安装 axios | npm install axios */
/* 2.导入模块 */
const axios = require('axios');

/* 封装函数获取存放模板信息的数据 */
async function fetchRepositoryList() {

    let { data } = await axios.get("https://api.github.com/orgs/zhu-cli/repos");
    return data;
}

module.exports = async(arg) => {
    console.log("arg", arg);
    let data = fetchRepositoryList();
    console.log(data);
};