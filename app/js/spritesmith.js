const path = require("path")
const SpritesmithPlugin = require('webpack-spritesmith')
const archiver =require('archiver')
const fs =require('fs')
const webpack = require("webpack")
const unifiedfs = require("./fs")
 function unifiedFile(pathurl){
    return new Promise((res,rej)=>{
    let typelist= unifiedfs.getChangeFiles('../public/upload/'+pathurl, [`.png`,'.jpeg'], `.jpg`);
     res(typelist)
    })
}

async function startspritesmith(pathurl){
    let res = await  unifiedFile(pathurl)
    let resmege = await  merge(res,pathurl)
    let resUrl = await  runzip(pathurl)
    return resUrl
}

 function merge(typelist,pathurl){
   return new Promise((res,rej)=>{
    typelist.forEach(val => {
        webpack({
            plugins:[
                new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname,'../public/upload/'+ pathurl),
                        glob: '*.'+val
                    },
                    target: {
                        image: path.resolve(__dirname, '../public/download/'+pathurl+'/sprite.'+val),
                        css: path.resolve(__dirname, '../public/download/'+pathurl+'/sprite.'+val+'.css')
                    },
                    apiOptions: {
                        cssImageRef: "../sprite."+val
                    }
                })
            ]
        }, function (err, stats) {
            if(!err){
                res(true)
            }
            if (err) throw err
          })
    });
   })
}

function runzip(pathurl){
    console.log('pathurl---',pathurl)
  return new Promise((res,rej)=>{
  const output = fs.createWriteStream( path.join(__dirname,'../public/downloadrar/'+pathurl+".zip") );
  const archive = archiver('zip');
  archive.on('error', function (err) {
    throw err;
  });
  archive.pipe(output);
  // 文件夹压缩
  archive.directory('../public/download/'+pathurl+'/', true);
  // 文件压缩
//   archive.file('../public/download/'+pathurl+'/sprite.jpg');
  archive.finalize();
  res('app/public/downloadrar/'+pathurl+".zip")
  })
  }
module.exports = startspritesmith