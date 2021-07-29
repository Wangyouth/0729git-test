const router = require('koa-router')()

const axios = require('axios')

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

//-------------------------------------------------------
//-------------------------------------------------------
//-------------自己添加的请求-----------

// 获取资源的函数--get
function routerGet(url, lineurl) {
  router.get(url, async (ctx, next) => {
    var response = await axios.get(lineurl);
    var list = response.data;
    ctx.body = {
      list
    }
  })
}

//--------------------------------index.html------------------------
//轮播图片获取
// router.get('/bannerimg', async (ctx, next) => {
//   var response = await axios.get('http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f');
//   var list = response.data;
//   ctx.body = {
//     list
//   }
// })

// 首页导航--男--女--办公--电脑
routerGet('/quicknav', 'http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f')

// 首页产品----精品女装--精品男装--电脑办公
routerGet('/goodsmain', 'http://vueshop.glbuys.com/api/home/index/goodsLevel?token=1ec949a15fb709370f')

// 首页推荐  
routerGet('/goodsrecom', 'http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f')

// 首页---点击搜索----热门词汇  
routerGet('/searchkeywordswrap', 'http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f')




// -------------------------goodsclassify.html---------------
// 左侧分类  
routerGet('/classifyitem', 'http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f')
// 右侧列表  
// routerGet('/goodswrap', 'http://vueshop.glbuys.com/api/home/category/show?cid=492&token=1ec949a15fb709370f')

router.get('/goodswrap', async (ctx, next) => {
  console.log(ctx.request.query.cid);
  var cid = ctx.request.query.cid
  var response = await axios.get('http://vueshop.glbuys.com/api/home/category/show?cid=' + cid + '&token=1ec949a15fb709370f');
  var list = response.data;
  ctx.body = {
    list
  }
})

// ------------------------- details.html-----------------------------

// router.get('/goodsdetails', async (ctx, next) => {
//   console.log(ctx.request.query.gid);
//   var gid = ctx.request.query.gid
//   var response = await axios.get('http://vueshop.glbuys.com/api/home/goods/info?gid=' + gid + '&type=details&token=1ec949a15fb709370f');

//   var list = response.data;
//   ctx.body = {
//     list
//   }
// })



// -------------------------login.html------reg.html -----------------------






module.exports = router// 自带的不要删
