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


    // 判断购物车有无物品列表，有就把数据拿出来保存，没有就创建一个list
    // 只保存数据，不显示
    if (sessionStorage.getItem('goodslist')) {
        var goodslist = sessionStorage.getItem('goodslist');
        sessionStorage.setItem('goodslist', goodslist);
        if (goodslist.length == 2) {
            $('.bottom-nav .car .spot').css('display', 'none')
            $('#cart-icon .spot ').css('display', 'none')
        } else {
            $('.bottom-nav .car .spot').css('display', 'block')
            $('#cart-icon .spot ').css('display', 'block')
        }
    } else {
        var goodslist = []
        goodslist = JSON.stringify(goodslist)
        sessionStorage.setItem('goodslist', goodslist);
        $('.bottom-nav .car .spot').css('display', 'none')
        $('#cart-icon .spot ').css('display', 'none')
    }


    // 判断收藏列表有无数据，有就把数据拿出来保存，没有就创建一个favlist
    // 只保存数据，不显示
    if (sessionStorage.getItem('favlist')) {
        var favlist = sessionStorage.getItem('favlist');
        sessionStorage.setItem('favlist', favlist);
    } else {
        var favlist = []
        favlist = JSON.stringify(favlist)
        sessionStorage.setItem('favlist', favlist);
    }

    // 判断----地址列表---addresslist
    // 只保存数据，不显示
    if (localStorage.getItem('addresslist')) {
        var addresslist = localStorage.getItem('addresslist');
        localStorage.setItem('addresslist', addresslist);
    } else {
        var addresslist = []
        addresslist = JSON.stringify(addresslist)
        localStorage.setItem('addresslist', addresslist);
    }






})//加载