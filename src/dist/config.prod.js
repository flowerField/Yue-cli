"use strict";var fs=require("fs"),_require=require("ini"),encode=_require.encode,decode=_require.decode,_require2=require("../util/constants.js"),defaultConfig=_require2.defaultConfig,configFile=_require2.configFile;module.exports=function(e,i,o){var r,n={};if(fs.existsSync(configFile)&&(r=fs.readFileSync(configFile,"utf8"),r=decode(r),Object.assign(n,c)),"get"===e)console.log(n[i]||defaultConfig[i]);else if("set"===e)n[i]=o,fs.writeFileSync(configFile,encode(n)),console.log("".concat(i,"=").concat(o));else if("getVal"===e)return n[i]};