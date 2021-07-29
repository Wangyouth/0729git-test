$(function () {
    // 一些函数
    // 设置cookie
    function setCookie(key, value, iday) {
        var dateobj = new Date();
        dateobj.setDate(dateobj.getDate() + iday)
        document.cookie = key + "=" + value + ";expires=" + dateobj;
    }
    // 删除cookie
    function removeCookie(key) {
        var dateobj = new Date();
        dateobj.setDate(dateobj.getDate - 1);
        document.cookie = key + "=;expires=" + dateobj;
    }
    // 获取
    function getCookie(key) {
        var cookieData = document.cookie
        var arr = cookieData.split(';');
        for (var i = 0; i < arr.length; i++) {
            // 按=分割
            var arr1 = arr[i].split('=');
            if (arr1[0].replace(/^(\s)/g, '') == key) {
                return arr1[1]
            }
        }
        return '';
    }
    //轮播图插件
    function doswiper() {
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
    }


    //获取数据
    // 商品参数--详情
    $.ajax({
        type: "get",
        url: "http://vueshop.glbuys.com/api/home/goods/info?gid=" + sessionStorage.getItem('gid') + "&type=details&token=1ec949a15fb709370f",
        success: function (data) {
            var data = JSON.parse(data)
            // console.log(data);
            for (var i = 0; i < data.data.images.length; i++) {
                var str = '<div class="swiper-slide"><img src=' + data.data.images[i] + '></div>'
                $('.swiper-wrapper').append(str)
                doswiper()
            }
            //商品信息
            $('.goods-ele-main .goods-title').html(data.data.title)
            $('.goods-ele-main .price').html('￥' + data.data.price)
            $('.goods-ele-main .sales-wrap li span').html(data.data.freight)
            //选择--颜色-尺码-的时候的信息
            $('.cart-panel .goods-info .goods-img img').attr('src', data.data.images[0])
            $('.cart-panel .goods-info .goods-wrap .goods-title').html(data.data.title)
            $('.cart-panel .goods-info .goods-wrap .price').html('￥' + data.data.price)
            $('.cart-panel .goods-info .goods-wrap .goods-code').html('商品编码:' + data.data.gid)

            // 详情
            // console.log(data.data.bodys);
            $('.page-222 .content').html(data.data.bodys)

        }
    })
    // 商品规格
    $.ajax({
        type: "get",
        url: "http://vueshop.glbuys.com/api/home/goods/info?gid=" + sessionStorage.getItem('gid') + "&type=spec&token=1ec949a15fb709370f",
        success: function (data) {
            var data = JSON.parse(data)
            // console.log(data);
            for (let j = 0; j < data.data[0].values.length; j++) {
                // console.log(data.data[0].values[j].value);
                var str = ' <div class="val">' + data.data[0].values[j].value + '</div>'
                $('.attr-wrap .attr-list .color').append(str)
            }
            for (let j = 0; j < data.data[1].values.length; j++) {
                // console.log(data.data[1].values[j].value);
                var str = ' <div class="val" vid>' + data.data[1].values[j].value + '</div>'
                $('.attr-wrap .attr-list .size').append(str)
            }
        }

    })
    // 商品评价
    $.ajax({
        type: "get",
        url: "http://vueshop.glbuys.com/api/home/reviews/index?gid=" + sessionStorage.getItem('gid') + "&token=1ec949a15fb709370f&page=1",
        success: function (data) {
            var data = JSON.parse(data)
            // console.log(data);
            var reviewswrap111 = document.querySelector('.page-111 .reviews-wrap')
            var reviewswrap333 = document.querySelector('.page-333 .reviews-wrap')
            reviewswrap111.innerHTML = template('reviewswrap111', data);
            reviewswrap333.innerHTML = template('reviewswrap333', data);
        }

    })


    //事件
    // 点击顶部左侧返回按钮
    $('.details-header .back').on('click', function () {
        window.history.back(-1)
    })
    //点击商品--详情---评价
    $('.details-header .tab-wrap .tab-name').eq(0).on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.page-111').css('display', 'block')
        $('.page-222').css('display', 'none')
        $('.page-333').css('display', 'none')
    })
    $('.details-header .tab-wrap .tab-name').eq(1).on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.page-111').css('display', 'none')
        $('.page-222').css('display', 'block')
        $('.page-333').css('display', 'none')
    })
    $('.details-header .tab-wrap .tab-name').eq(2).on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.page-111').css('display', 'none')
        $('.page-222').css('display', 'none')
        $('.page-333').css('display', 'block')
    })
    //点击商品-更多评价
    $('.reviews-main .reviews-more').on('click', function () {
        $('.details-header .tab-wrap .tab-name').eq(2).addClass('active').siblings().removeClass('active')
        $('.page-111').css('display', 'none')
        $('.page-222').css('display', 'none')
        $('.page-333').css('display', 'block')
    })
    //点击--右上--购物车
    $('.details-header .cart-icon').on('click', function () {
        window.location.href = 'car.html'
    })

    //点击加入购物车，显示商品详情页面
    $('.bottom-btn-wrap .cart').on('click', function () {
        $('.mask').css('display', 'block')
        $('.cart-panel').removeClass('cart-panel-down').addClass('cart-panel-on')

        $('.cart-panel .close').on('click', function () {
            $('.mask').css('display', 'none')
            $('.cart-panel').removeClass('cart-panel-on').addClass('cart-panel-down')
        })
        $('.mask').on('click', function () {
            $('.mask').css('display', 'none')
            $('.cart-panel').removeClass('cart-panel-on').addClass('cart-panel-down')
        })
    })

    //点击颜色尺码--相应的颜色变化
    $('.attr-wrap .attr-list .color').on('click', '.val', function () {
        $(this).addClass('actives').siblings().removeClass('actives')
        // 把选定的颜色添加
        sessionStorage.setItem('color', $(this).html())
    })
    $('.attr-wrap .attr-list .size').on('click', '.val', function () {
        $(this).addClass('actives').siblings().removeClass('actives')
        // 把选定的尺码添加
        sessionStorage.setItem('size', $(this).html())
    })
    //点击数量，数量变化
    $('.amount-wrap .amount-input-wrap .del').on('click', function () {
        var $inputval = $('.amount-wrap .amount-input-wrap input').val()
        $inputval = parseInt($inputval)
        if ($inputval == 1) {
            $('.amount-wrap .amount-input-wrap input').val(1)
        } else {
            $('.amount-wrap .amount-input-wrap input').val($inputval - 1)
        }
    })
    $('.amount-wrap .amount-input-wrap .inc').on('click', function () {
        var $inputval = $('.amount-wrap .amount-input-wrap input').val()
        $inputval = parseInt($inputval)
        // console.log($inputval);
        $('.amount-wrap .amount-input-wrap input').val($inputval + 1)
    })

    //尺码颜色选好，点击确定
    $('.page-111 .sure-btn').on('click', function () {
        // 如果颜色和尺码没有选定--提示
        if (sessionStorage.getItem('color') == null || sessionStorage.getItem('size') == null) {
            $('.van-prompt').css('display', 'block').html('请选择颜色尺码信息')
            setTimeout(function () {
                $('.van-prompt').css('display', 'none')
            }, 1500)
        } else {
            // 颜色尺码选定----提示加入购物车
            $('.details-header .cart-icon .spot').css('display', 'block')
            $('.van-prompt').css('display', 'block').html('成功加入购物车')
            setTimeout(function () {
                $('.van-prompt').css('display', 'none')
            }, 1500)

            // 存储选定商品的信息
            goodslist = sessionStorage.getItem('goodslist');
            goodslist = JSON.parse(goodslist)
            // console.log(goodslist);
            var goods = {
                title: $('.cart-panel .goods-title').html(),
                imgsrc: $('.cart-panel .goods-info .goods-img img').attr('src'),
                price: $('.cart-panel .goods-info .goods-wrap .price').html().substr(1),
                postage: $('.goods-ele-main .sales-wrap span').html(),
                color: sessionStorage.getItem('color'),
                size: sessionStorage.getItem('size'),
                amount: parseInt($('.amount-input input').val())
            }
            goodslist.push(goods)
            goodslist = JSON.stringify(goodslist)
            sessionStorage.setItem('goodslist', goodslist);
        }
    })

    //加入收藏
    $('.bottom-btn-wrap .fav').on('click', function () {
        let islogin = getCookie('islogin')
        islogin = JSON.parse(islogin)
        //islogin判断是否登录了
        if (islogin) {
            // 获取要收藏的商品信息
            let favlist = sessionStorage.getItem('favlist');
            favlist = JSON.parse(favlist)
            let fav_bol = true;
            for (let index = 0; index < favlist.length; index++) {
                // console.log(typeof favlist[index].gid);
                // console.log(typeof sessionStorage.getItem('gid'));
                if (favlist[index].gid == sessionStorage.getItem('gid')) {
                    fav_bol = false; break;
                } else {
                    fav_bol = true;
                }
            }

            //看当前商品是不是在收藏列表里，如果在，就提示收藏过了
            if (fav_bol) {
                $('.van-prompt').css('display', 'block').html('收藏成功')
                setTimeout(function () {
                    $('.van-prompt').css('display', 'none')
                }, 2000)

                var favs = {
                    title: $('.cart-panel .goods-title').html(),
                    imgsrc: $('.cart-panel .goods-info .goods-img img').attr('src'),
                    price: $('.cart-panel .goods-info .goods-wrap .price').html().substr(1),
                    gid: sessionStorage.getItem('gid')
                }
                favlist.unshift(favs)
                favlist = JSON.stringify(favlist)
                sessionStorage.setItem('favlist', favlist);
            } else {
                $('.van-prompt').css('display', 'block').html('已经收藏过了')
                setTimeout(function () {
                    $('.van-prompt').css('display', 'none')
                }, 2000)
            }
        } else {
            $('.van-prompt').css('display', 'block').html('请先登录！2秒后转登录')
            setTimeout(function () {
                $('.van-prompt').css('display', 'none')
                window.location.href = 'login.html'
            }, 2000)

        }
    })








})// 加载事件
