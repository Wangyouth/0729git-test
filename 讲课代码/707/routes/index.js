const router = require('koa-router')()
const fs=require('fs')

// fs是nodejs提供给我们的内置模块，fs，读取文件的相关信息
// readFileSync 读取文件，文件路径相对于根路径

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/list', async (ctx, next) => {
  // console.log(ctx.request.query)
  // ctx.body = 'list data'

  // await new Promise((resolve,reject)=>{
  //   setTimeout(()=>{
  //     resolve();
  //   },2000)
  // })

  ctx.body={
    errcode:0,
    errmsg:'ok',
    list:[
      { "username":"aoao","age":20,"gender":"男"},
      { "username":"bobo","age":30,"gender":"男"},
      { "username":"coco","age":40,"gender":"女"}
    ]
  }
})


router.post('/list2', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = 'list2 data'
})

router.post('/list', async (ctx, next) => {
  // console.log(ctx.request.body);

  var args=[
    {field:'page',type:'number'},
    {field:'count',type:'number'}
  ]
  // Object.keys这个方法可以拿到两个key值，返回一个数组，在这个数据中，第一项就是page，第二项是count，使用方法includes，是否包含某一项，判断item是否包含，包含true，不包含返回一个false
  var body=ctx.request.body;
  for(var i=0;i<args.length;i++){
    var item=args[i];
    if(!Object.keys(body).includes(item.field)){
      ctx.body={
        errcode:-1,
        errmsg:"参数个数错误"
      };
      return;
    }
    else{
      if(typeof body[item.field]!=item.type){
        ctx.body={
          errcode:-2,
          errmsg:"参数类型错误"
        }
        return;
      }
    }
  }
  var data=fs.readFileSync('./data/list.json')
  data=JSON.parse(data);
  var list=data.splice(body.page*body.count,body.count);

  ctx.body={
    errcode:0,
    errmsg:'ok',
    list
  }

 // ctx.body="ok"

})





module.exports = router
