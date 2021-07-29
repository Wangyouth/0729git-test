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

    // 获取数据
    function showlist() {
        //看看物品列表里面有没有物品，有的话就显示，没有就显示空白
        var goodslist = sessionStorage.getItem('goodslist');
        goodslist = JSON.parse(goodslist)
        if (goodslist.length == 0) {
            //没有物品就不展示
            var goodslisthtml = document.querySelector('.goodslist')
            goodslisthtml.innerHTML = ''
            $('.orderend-btn').css('background-color', '#bfbfbf')//结算灰色
            $('.sub-header .back').css('display', 'none')//顶部返回按钮--不显示
            $('.orderend-wrap .select-btn').removeClass('active')//全选--不选中
        } else {
            //有物品就显示
            var goodslisthtml = document.querySelector('.goodslist')
            goodslisthtml.innerHTML = template('goodslist', goodslist);
            $('.orderend-btn').addClass('orderend-btn-color')
            $('.sub-header .back').css('display', 'black')
            $('.orderend-wrap .select-btn').addClass('active')

            //计算总价
            var sum = 0
            var postagesum = 0
            for (let index = 0; index < goodslist.length; index++) {
                sum = sum + goodslist[index].price * goodslist[index].amount
                postagesum = postagesum + parseInt(goodslist[index].postage)
            }
            $('.orderend-wrap .select-area .total span:last').html('￥' + sum)
            $('.orderend-wrap .select-area .total span:first').html('￥' + postagesum)
            // console.log(goodslist[0].price);
            // console.log(goodslist[0].amount);
            // console.log(goodslist[0].price * goodslist[0].amount);
        }
    }
    showlist()//获取数据显示数据

    // 计算--运费--总价-------------------全选后计算--单选按钮后计算--删除后计算
    function allprice() {
        var goodslist = sessionStorage.getItem('goodslist');
        goodslist = JSON.parse(goodslist)
        var sum = 0
        var postagesum = 0
        for (let index = 0; index < goodslist.length; index++) {
            sum = sum + goodslist[index].price * goodslist[index].amount
            postagesum = postagesum + parseInt(goodslist[index].postage)
        }
        $('.orderend-wrap .select-area .total span:last').html('￥' + sum)
        $('.orderend-wrap .select-area .total span:first').html('￥' + postagesum)
    }



    //事件
    //顶部返回按钮
    $('.sub-header .back').on('click', function () {
        window.history.back(-1)
    })

    //点击底部三个按钮跳转到相应的页面
    $('.bottom-nav .home').on('click', function () {
        window.location.href = 'index.html'
    })
    $('.bottom-nav .my').on('click', function () {
        window.location.href = 'my.html'
    })

    // 点击单选按钮
    $('.goodslist').on('click', '.select-btn', function () {
        // 添加--去除---选定样式
        $(this).toggleClass('active')
        // 如果单选按钮--全部--未选定------全选按钮--未选定
        var $length = $(this).parent().parent().find('.cart-list').length;
        var select = 0;
        for (let index = 0; index < $length; index++) {
            // console.log($('.goodslist .cart-list').eq(index));
            if ($('.goodslist .cart-list').eq(index).find('.select-btn').hasClass('active')) {
                select++;
            } else {
                continue;
            }
        }
        // console.log(select);
        if (select == 0) {
            $('.orderend-btn').removeClass('orderend-btn-color');
            $('.orderend-wrap .select-btn').removeClass('active');
        } else if (select == $length) {
            $('.orderend-wrap .select-btn').addClass('active');
        } else {
            $('.orderend-btn').addClass('orderend-btn-color');
            $('.orderend-wrap .select-btn').removeClass('active');
        }

        // 重新计算--价格--邮费
        var goodslist = sessionStorage.getItem('goodslist');
        goodslist = JSON.parse(goodslist)
        var sum = 0
        var postagesum = 0
        for (let index = 0; index < $length; index++) {
            // console.log($('.goodslist .cart-list').eq(index));
            if ($('.goodslist .cart-list').eq(index).find('.select-btn').hasClass('active')) {
                // console.log(index);
                sum = sum + goodslist[index].price * goodslist[index].amount
                postagesum = postagesum + parseInt(goodslist[index].postage)
            } else {
                continue;
            }
        }
        $('.orderend-wrap .select-area .total span:last').html('￥' + sum)
        $('.orderend-wrap .select-area .total span:first').html('￥' + postagesum)

    })

    //全选按钮
    $('.orderend-wrap .select-btn').on('click', function () {
        $(this).toggleClass('active')

        if ($(this).hasClass('active')) {
            $('.goodslist .select-btn').addClass('active')
            //计算总价
            allprice()
            $('.orderend-btn').addClass('orderend-btn-color')
        } else {
            $('.goodslist .select-btn').removeClass('active')
            $('.orderend-btn').removeClass('orderend-btn-color')
            $('.orderend-wrap .select-area .total span:last').html('￥0')
            $('.orderend-wrap .select-area .total span:first').html('￥0')
        }
    })

    // 删除事件
    function getGoodsList() {
        var goodslist = sessionStorage.getItem('goodslist');
        goodslist = JSON.parse(goodslist)
        return goodslist
    }

    $('.goodslist').on('click', '.del', function (e) {
        // alert($(this).parent().parent().index())
        //获取当前的列表----删除对应序号的物品
        // var goodslist = sessionStorage.getItem('goodslist');
        // goodslist = JSON.parse(goodslist)
        var goodslist = getGoodsList()
        var $index = $(this).parent().parent().index()
        goodslist.splice($index, 1)
        // console.log(goodslist);
        goodslist = JSON.stringify(goodslist)
        sessionStorage.setItem('goodslist', goodslist);
        //重新渲染
        // var goodslist = sessionStorage.getItem('goodslist');
        // goodslist = JSON.parse(goodslist)
        var goodslist = getGoodsList()
        var goodslisthtml = document.querySelector('.goodslist')
        goodslisthtml.innerHTML = template('goodslist', goodslist);
        $(this).parent().parent().remove()
        allprice();//计算金额
        //如果全删除了---底部购物车上的点消失
        if (goodslist.length == 0) {
            $('.orderend-wrap .select-btn').removeClass('active')
            $('.orderend-btn').css('background-color', '#bfbfbf')
            $('.bottom-nav .car .spot').css('display', 'none')
        } else {
            $('.bottom-nav .car .spot').css('display', 'block')
            $('.orderend-btn').css('background-color', '#cc0004')
            $('.orderend-wrap .select-btn').addClass('active')
        }
    })

    // 去结算
    $('.orderend-wrap .orderend-btn').on('click', function () {
        let islogin = getCookie('islogin')
        islogin = JSON.parse(islogin)
        if (islogin) {
            alert('确认订单')
        } else {
            window.location.href = 'login.html'
        }
    })












})//加载