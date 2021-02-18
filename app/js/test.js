const path = require("path")
const SpritesmithPlugin = require('webpack-spritesmith')
const archiver =require('archiver')
const fs =require('fs')
const webpack = require("webpack")

runzip('t1611488496820')

function runzip(pathurl){
  console.log('pathurl---',pathurl)
// const output = fs.createWriteStream( join(__dirname,'../downloadrar/'+pathurl+".zip")  );
return new Promise((res,rej)=>{
const output = fs.createWriteStream('../public/downloadrar/'+pathurl+".zip");
const archive = archiver('zip');
archive.on('error', function (err) {
  throw err;
});
archive.pipe(output);
// 文件夹压缩
archive.directory('../public/download/'+pathurl+'/', true);
// 文件压缩
// archive.file('test.js');
archive.finalize();
console.log("压缩完毕")
res('/downloadrar/'+pathurl+".zip")
})
}