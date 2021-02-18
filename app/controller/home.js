'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
const path =require("path")
const pump= require('mz-modules/pump')
const startspritesmith = require('../js/spritesmith')

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getcsrf(){
    const { ctx } = this;
    ctx.body = {csrf:ctx.csrf}
  }
  async forms(){
    const { ctx } = this;
    let parts = this.ctx.multipart({ autoFields: true })
    const currentdata = 't'+Date.now()
    let mkdirUpload= fs.mkdirSync( path.join(__dirname, '../public/upload/'+currentdata))
    let mkdirDownload= fs.mkdirSync(path.join(__dirname,'../public/download/'+currentdata))
    let stream, img_list = []; // 图片访问地址集合
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      // 文件名为：时间戳+随机字符串+.文件后缀
      let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      let target = 'app/public/upload/'+currentdata +'/'+ filename;
      img_list.push('/public/upload/'+currentdata +'/'+ filename);
      let writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      // let res = await  startspritesmith.start(currentdata)
    }
    let res = await  startspritesmith(currentdata)
    console.log('resss',res)
    ctx.state.csrf = ctx.csrf;
    ctx.body = {code:'200',data:'ok',url:res}
  }
  async downloads() {
    const { ctx } = this;
    // const filePath = path.resolve(this.app.config.static.dir, 'test.txt');
    const filePath = path.resolve(path.join(__dirname,'..','public','downloadrar','t1612860331716.zip'));
    // const filePath = path.resolve(path.join(__dirname,'..','public','downloadrar','test.txt'));
   
    // console.log("filePath.length",filePath.length)
    //  ctx.attachment('t1612069661624.zip');
    // //  ctx.set('Content-Type', 'blob');
    //  ctx.set('Content-Type', 'application/octet-stream');
    //  ctx.body = fs.createReadStream(filePath);
    //  const filePath = path.resolve(path.join(__dirname,'..','public','downloadrar','test.txt'));
     ctx.attachment('hello.zip');
    ctx.set('Content-Type', 'application/octet-stream');
    //  ctx.set('Content-Type', 'application/zip');
     ctx.body = fs.createReadStream(filePath);
    //  ctx.set('Content-Type', 'application/blob');
      // ctx.body = {
      //   data:fs.createReadStream(filePath),
      //   type:'application/octet-stream'
      // }
  }
}

module.exports = HomeController;
