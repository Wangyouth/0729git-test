$(function () {
    // 封装的axios - get函数
    // url-------往index.js里面请求的地址
    // tempid------模板引擎的id
    // element---装模板引擎的容器
    function axiosGet(url, tempid, element) {
        axios.get(url).then(function (res) {
            element.innerHTML = template(tempid, res.data.list);
        })
    }

    // 获取左侧列表
    // axiosGet('/classifyitem', 'classifyitem', document.querySelector('.classify-wrap'))
    var classifyitem = document.querySelector('.classify-wrap')
    axios.get('/classifyitem').then(function (res) {
        // console.log(res.data.list)
        // console.log(res.data.list.data[0].items[0])
        classifyitem.innerHTML = template('classifyitem', res.data.list);
    })

    // 获取右侧列表
    // axiosGet('/classifyitem', 'classifyitem', document.querySelector('.goods-content-main'))
    var goodscontentmain = document.querySelector('.goods-content-main')
    var goodswrap = goodscontentmain.querySelector('div')
    axios.get('/goodswrap', {
        params: {
            cid: sessionStorage.getItem('cid')
        }
    }).then(function (res) {
        $(".classify-wrap .classify-item").each(function () {
            if ($(this).attr('cid') == sessionStorage.getItem('cid')) {
                $(this).addClass('active')
            }
        })
        if (res.data.list.status == 1) {
            // console.log(res.data);
            goodswrap.innerHTML = template('goodswrap', res.data.list);
            $('.goods-content-main .goods-wrap').css('display', 'block')
            $('.goods-content-main .no-data').css('display', 'none')
        } else if (res.data.list.status == 0) {
            $('.goods-content-main .goods-wrap').css('display', 'none')
            $('.goods-content-main .no-data').css('display', 'block')
        }
    })

    //配置上拉下拉
    // var classifywrap = document.querySelector('.classify-wrap')
    // let bs = BetterScroll.createBScroll(classifywrap.querySelector('div'), {
    //     pullDownRefresh: {
    //         threshold: 30
    //     },
    //     pullUpLoad: {
    //         threshold: -10
    //     }
    // })




    //事件
    //点击返回，返回上一个页面
    $('.search-header .back').on('click', function () {
        window.history.back(-1);
    })
    //点击搜索框显示搜索页面
    $('.search').on('click', function () {
        $('.search-component').css('display', 'block')
        //显示热门搜索
        var searchkeywordswrap = document.querySelector('.search-keywords-wrap')
        axios.get('/searchkeywordswrap').then(function (res) {
            // console.log(res.data) 
            searchkeywordswrap.innerHTML = template('searchkeywords', res.data.list);
        })
    })
    $('.close').on('click', function () {
        $('.search-component').css('display', 'none')
    })

    //点击左侧分类，右侧显示对应的信息
    $('.classify-wrap').on('click', '.classify-item', function () {
        // console.log($(this).attr('cid'));
        $(this).addClass('active').siblings().removeClass('active')

        var goodscontentmain = document.querySelector('.goods-content-main')
        var goodswrap = goodscontentmain.querySelector('div')
        axios.get('/goodswrap', {
            params: {
                cid: $(this).attr('cid')
            }
        }).then(function (res) {
            // console.log(res.data)
            // console.log(res.data.list.status)
            if (res.data.list.status == 1) {
                goodswrap.innerHTML = template('goodswrap', res.data.list);
                $('.goods-content-main .goods-wrap').css('display', 'block')
                $('.goods-content-main .no-data').css('display', 'none')
            } if (res.data.list.status == 0) {
                $('.goods-content-main .goods-wrap').css('display', 'none')
                $('.goods-content-main .no-data').css('display', 'block')
            }

        })
    })

    // 点击右侧图片列表，进入相应的商品界面
    $('.goods-content-main').on('click', 'ul', function () {
        // console.log($(this).find('img').attr('gid'));
        sessionStorage.setItem('gid', $(this).find('img').attr('gid'))
        window.location.href = 'details.html'
    })








})