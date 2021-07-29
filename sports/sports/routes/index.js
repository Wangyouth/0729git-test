const router = require('koa-router')()
const fs = require('fs')
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

//自己添加的请求
router.get('/list', async (ctx, next) => {
  // console.log(ctx.request.query)
  ctx.body = 'list list list  string'
})
router.post('/list2', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = 'list list list2222222222222222222222'
})
router.get('/listlist', async (ctx, next) => {
  console.log(ctx.request.query)
  // ctx.body = 'list data'
  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list: [
      { "username": "a1111111", "age": 20, "gender": "男" },
      { "username": "b1222222", "age": 30, "gender": "男" },
      { "username": "c1333333", "age": 40, "gender": "女" }
    ]
  }
})



//1-0705练习
router.get('/demo1', async (ctx, next) => {
  ctx.body = 'demo1 get--get--get--'
})
router.post('/demo2', async (ctx, next) => {
  ctx.body = 'demo2 post--post--post--'
})



//706-tea-sports
router.post('/list', async (ctx, next) => {
  // console.log(ctx.request.body);
  var args = [
    { field: 'page', type: 'number' },
    { field: 'count', type: 'number' }
  ]
  // Object.keys这个方法可以拿到两个key值，返回一个数组，在这个数据中，第一项就是page，第二项是count，使用方法includes，是否包含某一项，判断item是否包含，包含true，不包含返回一个false
  var body = ctx.request.body;
  for (var i = 0; i < args.length; i++) {
    var item = args[i];
    if (!Object.keys(body).includes(item.field)) {
      ctx.body = {
        errcode: -1,
        errmsg: "参数个数错误"
      };
      return;
    } else if (typeof body[item.field] != item.type) {
      ctx.body = {
        errcode: -2,
        errmsg: "参数类型错误"
      }
      return;
    }
  }
  var data = fs.readFileSync('./data/list.json')
  data = JSON.parse(data);
  var list = data.splice(body.page * body.count, body.count);

  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
  // ctx.body="ok"
})

//707-sports.html
router.post('/list707', async (ctx, next) => {
  var args = [
    { field: 'page', type: 'number' },
    { field: 'count', type: 'number' }
  ]
  var body = ctx.request.body;
  for (var i = 0; i < args.length; i++) {
    var item = args[i]
    if (!Object.keys(body).includes(item.field)) {
      ctx.body = {
        errcode: -1,
        errmsg: '参数个数错误'
      }
      return
    } else if (typeof body[item.field] != item.type) {
      ctx.body = {
        errcode: -2,
        errmsg: '参数类型错误'
      }
      return
    }
  }

  var data = fs.readFileSync('./data/list.json')
  data = JSON.parse(data)
  var list = data.splice(body.page * body.count, body.count)
  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
})



//708-tea-sports.html的接口请求地址配置
router.post('/list', async (ctx, next) => {
  // console.log(ctx.request.body);

  var args = [
    { field: 'page', type: 'number' },
    { field: 'count', type: 'number' }
  ]
  // Object.keys这个方法可以拿到两个key值，返回一个数组，在这个数据中，第一项就是page，第二项是count，使用方法includes，是否包含某一项，判断item是否包含，包含true，不包含返回一个false
  var body = ctx.request.body;
  for (var i = 0; i < args.length; i++) {
    var item = args[i];
    if (!Object.keys(body).includes(item.field)) {
      ctx.body = {
        errcode: -1,
        errmsg: "参数个数错误"
      };
      return;
    }
    else {
      if (typeof body[item.field] != item.type) {
        ctx.body = {
          errcode: -2,
          errmsg: "参数类型错误"
        }
        return;
      }
    }
  }
  var data = fs.readFileSync('./data/list.json')
  data = JSON.parse(data);
  var list = data.splice(body.page * body.count, body.count);

  var response = await axios.get('http://openapi.inews.qq.com/getQQNewsIndexAndItems?chlid=news_news_cba&refer=mobilewwwqqcom&srcfrom=newsapp&otype=json&mergetop=1&ext_action=Fimgurl33,Fimgurl32,Fimgurl30');

  var ids = response.data.idlist[0].ids.map((v, i) => {
    return v.id
  })
  // console.log(ids)
  ids = ids.splice(body.page * body.count, body.count);

  var response = await axios.get('http://openapi.inews.qq.com/getQQNewsNormalContent?ids=&refer=mobilewwwqqcom&srcfrom=newsapp&otype=json&&extActionParam=Fimgurl33,Fimgurl32,Fimgurl30&extparam=src,desc', {
    params: {
      ids: ids.toString() || ''
    }
  });

  // 数据的循环
  var list = response.data.newslist;
  for (var i = 0; i < list.length; i++) {
    list[i].img = list[i].thumbnails[0];
    list[i].comment = list[i].comments;
  }


  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }


})


//test-快递.html的接口请求地址配置
router.post('/test', async (ctx, next) => {
  var response = await axios.post('http://www.kuaidi.com/index-ajaxselectcourierinfo--.html');
  var list = response.data;

  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
})



//708--test-weather.html的接口请求地址配置
router.post('/list708', async (ctx, next) => {
  var response = await axios.post('https://www.fastmock.site/mock/d1112866aa7c2f998b459a134bfbc626/sky/weather');

  var list = response.data.value[0];
  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
})


//test-书籍.html的接口请求地址配置
router.post('/book', async (ctx, next) => {
  var response = await axios.post('https://way.jd.com/smyt/MUTUAL_FUND_INFO');

  var list = response.data;
  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
})






//index自带的，不要删
module.exports = router//index自带的，不要删
