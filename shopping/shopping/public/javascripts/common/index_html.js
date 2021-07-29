$(function () {
    // 轮播图插件
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    // 封装的axios - get函数
    // url-------往index.js里面请求的地址
    // tempid------模板引擎的id
    // element---装模板引擎的容器
    function axiosGet(url, tempid, element) {
        axios.get(url).then(function (res) {
            element.innerHTML = template(tempid, res.data.list);
        })
    }


    // 轮播图片在线获取
    // var bannerimg = document.querySelector('.swiper-container')
    // axios.get('/bannerimg').then(function (res) {
    //     // console.log(res.data)
    //     bannerimg.innerHTML = template('banner', res.data.list);
    // })

    // 首页-分类-男-女-办公-电脑
    axiosGet('/quicknav', 'quicknav', document.querySelector('.quick-nav'))
    // var quicknav = document.querySelector('.quick-nav')
    // axios.get('/quicknav').then(function (res) {
    //     // console.log(res.data)
    //     quicknav.innerHTML = template('quicknav', res.data.list);
    // })





    // 首页产品--精品女装--精品男装--电脑办公
    var goodsmain000 = document.querySelectorAll('.goods-main')[0];
    var goodsmain111 = document.querySelectorAll('.goods-main')[1];
    var goodsmain222 = document.querySelectorAll('.goods-main')[2];
    axios.get('/goodsmain').then(function (res) {
        // console.log(res.data)
        //     console.log(res.data.list)
        //     console.log(res.data.list.data)
        goodsmain000.innerHTML = template('goods-main000', res.data);
        goodsmain111.innerHTML = template('goods-main111', res.data);
        goodsmain222.innerHTML = template('goods-main222', res.data);
    })


    // 为你推荐
    axiosGet('/goodsrecom', 'goodsrecom', document.querySelector('.goods-recom'))
    // var goodsrecom = document.querySelector('.goods-recom')
    // axios.get('/goodsrecom').then(function (res) {
    //     // console.log(res.data)
    //     goodsrecom.innerHTML = template('goodsrecom', res.data.list);
    // })



    // 搜索--热门产品在线获取
    var searchkeywordswrap = document.querySelector('.search-keywords-wrap')
    axios.get('/searchkeywordswrap').then(function (res) {
        // console.log(res.data)
        // console.log(res.data.list.data[0].items[0])
        searchkeywordswrap.innerHTML = template('searchkeywords', res.data.list);
    })






    // 事件
    //页面卷去一部分，搜索框的背景颜色变成红色渐变色
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 183) {
            $('.header').css('background', 'linear-gradient(#eb1625,hsla(0,0%,100%,0))')
        } else {
            $('.header').css('background', 'linear-gradient(rgba(1,1,1,.2),hsla(0,0%,100%,0))')
        }
    })
    //点击头部--左侧商品列表--显示商品页面
    $('.classify-icon').on('click', function () {
        sessionStorage.setItem('cid', 492);
        window.location.href = 'goodsclassify.html'
    })
    //点击搜索框显示搜索页面
    $('.search-wrap').on('click', function () {
        $('.search-component').css('display', 'block')
    })
    $('.close').on('click', function () {
        $('.search-component').css('display', 'none')
    })
    //点击头部--登录
    $('.login').on('click', function () {
        window.location.href = 'login.html'
    })

    //点击底部三个按钮跳转到相应的页面
    $('.bottom-nav .car').on('click', function () {
        window.location.href = 'car.html'
    })
    $('.bottom-nav .my').on('click', function () {
        window.location.href = 'my.html'
    })

    //首页
    //点击-quick-nav,点击进入相应的部分
    $('.quick-nav').on('click', '.item', function () {
        var $cid = $(this).attr('cid')
        // console.log($cid);
        sessionStorage.setItem('cid', $cid);
        window.location.href = 'goodsclassify.html'
    })
    //点击-图片--进入商品详情界面
    $('.goods-main').on('click', '.goods-image', function () {
        sessionStorage.setItem('gid', $(this).attr('gid'));
        window.location.href = 'details.html'
    })
    $('.goods-main').on('click', '.goods-list', function () {
        sessionStorage.setItem('gid', $(this).attr('gid'));
        window.location.href = 'details.html'
    })
    $('.goods-recom').on('click', '.goods-list', function () {
        sessionStorage.setItem('gid', $(this).attr('gid'));
        window.location.href = 'details.html'
    })



})//窗口加载事件的括号