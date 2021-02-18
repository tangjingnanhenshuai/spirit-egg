let fs = require('fs');//引用文件系统模块
const imageInfo = require("imageinfo")
const join =require('path').join
let unified = {
    readFileList: function(path, filesList) {
        console.log("path--",path)
        let fileTypeList = []
        filesList = filesList || [];
        let files = fs.readdirSync( join(__dirname,path));
        console.log("files--",files)
        files.forEach(function (filename, index) {
            let valdata= fs.readFileSync(join(__dirname,path+filename))
            let info = imageInfo(valdata)
            if(!info){ return }
            let filenameList=filename.split('.')
            const fileLast=filenameList[filenameList.length-1]
            filenameList[filenameList.length-1] = info.format.toLocaleLowerCase()
            if(fileTypeList.indexOf(info.format.toLocaleLowerCase())==-1){
                   fileTypeList.push(info.format.toLocaleLowerCase())
            }
            if( fileLast.toLocaleUpperCase() != info.format ){
                unified.rename(path+filename, path+filenameList.join('.'), filename, filenameList.join('.'));
            }
            //var stat = fs.statSync(path + filename);//读取的文件信息
            // if (fs.statSync(path + filename).isDirectory()) { 
            //     //isDirectory 判断是不是目录
            //     //递归读取文件
            //     unified.readFileList(`${path}${filename}/`, filesList);
            // } else {
            //     filesList.push({
            //         path,//路径
            //         filename,//名字
            //     });
            // }
        })
        // return filesList
        return fileTypeList
    },
    //修改文件名称
    rename: function(oldPath, newPath, filename, newSuffixFile) {
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                throw err;
            }
            console.log(`${filename} 修改为 => ${newSuffixFile}`)
        });
    },
    //批量修改文件名称
    getChangeFiles: function (path, oldSuffix, newSuffix) {
        if(!oldSuffix && !newSuffix){
            console.log(`后缀未设置`);
        }
        if(path.indexOf(path.length-1)!='/'){
            path+='/'
        }
       return  this.readFileList(path)
        // this.readFileList(path).forEach((item) => {
        //     if(oldSuffix instanceof Array){
        //         oldSuffix.forEach(oldSuffixFile=>{
        //         if(item.filename.indexOf(oldSuffixFile) > -1){
        //                 console.log(item.filename)
        //                 let oldPath = item.path + item.filename,
        //                 newSuffixFile = item.filename.split(oldSuffixFile)[0] + newSuffix,
        //                 newPath = item.path + newSuffixFile
        //                 unified.rename(oldPath, newPath, item.filename, newSuffixFile);
        //           }
        //         })
        //     }else{
        //           if(item.filename.indexOf(oldSuffix) > -1){
        //                 console.log(item.filename)
        //                 let oldPath = item.path + item.filename,
        //                 newSuffixFile = item.filename.split(oldSuffix)[0] + newSuffix,
        //                 newPath = item.path + newSuffixFile
        //                 unified.rename(oldPath, newPath, item.filename, newSuffixFile);
        //           }
        //     }
        // });
    }
}
 
module.exports = unified