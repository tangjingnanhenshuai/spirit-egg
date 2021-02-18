module.exports=(opt,app)=>{
  return async function auther(ctx,next){
    console.log("---------------------------- 使用了 middleware",)
    ctx.state.csrf=ctx.csrf;
    await next()
  }
}