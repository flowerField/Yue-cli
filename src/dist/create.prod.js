"use strict";var axios=require("axios"),ora=require("ora"),fs=require("fs"),ncp=require("ncp"),path=require("path"),inquirer=require("inquirer"),_require=require("util"),promisify=_require.promisify,downloadGitRepo=require("download-git-repo"),downloadGitRepo=promisify(downloadGitRepo),_require2=require("../util/constants.js"),downloadDirectory=_require2.downloadDirectory;function getRepositoryList(){var r,t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(axios.get("https://api.github.com/orgs/Yong-template/repos"));case 2:return r=e.sent,t=r.data,e.abrupt("return",t);case 5:case"end":return e.stop()}})}var getTagList=function(r){var t,n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(axios.get("https://api.github.com/repos/Yong-template/".concat(r,"/tags")));case 2:return t=e.sent,n=t.data,e.abrupt("return",n);case 5:case"end":return e.stop()}})},loading=function(a,o){return function(){var r,t,n=arguments;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return(r=ora(o)).start(),e.next=4,regeneratorRuntime.awrap(a.apply(void 0,n));case 4:return t=e.sent,r.succeed(),e.abrupt("return",t);case 7:case"end":return e.stop()}})}},downloadTask=function(r,t){var n,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return n="Yong-template/".concat(r),t&&(n+="#".concat(t)),a="".concat(downloadDirectory,"/").concat(r),console.log("dest",a,"url",n),e.next=6,regeneratorRuntime.awrap(downloadGitRepo(n,a));case 6:return e.abrupt("return",a);case 7:case"end":return e.stop()}})};module.exports=function(r){var t,n,a,o,s,i,c;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(loading(getRepositoryList,"fetching template ...")());case 2:return t=e.sent,e.next=5,regeneratorRuntime.awrap(inquirer.prompt({name:"repo",type:"list",message:"please choice a template to create project !",choices:t.map(function(e){return e.name})}));case 5:return n=e.sent,a=n.repo,e.next=9,regeneratorRuntime.awrap(loading(getTagList,"fetching tags ...")(a));case 9:return o=e.sent,e.next=12,regeneratorRuntime.awrap(inquirer.prompt({name:"tag",type:"list",message:"please choices tags to create project",choices:o.map(function(e){return e.name})}));case 12:return s=e.sent,i=s.tag,e.next=16,regeneratorRuntime.awrap(loading(downloadTask,"download template ...")(a,i));case 16:if(c=e.sent,console.log("template",c),console.log("path.resolve(projectName)",path.resolve(r)),fs.existsSync(path.join(c,"ask.js"))){e.next=22;break}return e.next=22,regeneratorRuntime.awrap(ncp(c,path.resolve(r)));case 22:case"end":return e.stop()}})};