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
    // 跳转至登录页面
    function toLogin() {
        window.location.href = 'login.html'
    }

    // 事件
    //点击底部三个按钮跳转到相应的页面
    $('.bottom-nav .car').on('click', function () {
        window.location.href = 'car.html'
    })
    $('.bottom-nav .home').on('click', function () {
        window.location.href = 'index.html'
    })

    //-------判断是否为登录状态--开始------- 
    var islogin = getCookie('islogin');
    islogin = JSON.parse(islogin)

    if (islogin) {
        // 如果登录了,设置登录了的样式
        $('.menu-list-wrap .login-btn').html('安全退出')
        $('.nickname').html(getCookie('uname'))

        // 如果登录了,点击-------全部订单
        $('.order-name-wrap ').on('click', function () {
            // alert('转往-----全部订单------页面')
            window.location.href = 'my_order.html'
        })

        // 如果登录了,点击---待支付0--待收货1--待评价2
        $(' .order-status-wrap').on('click', '.item', function () {
            if ($(this).index() == 0) {
                // alert('支付');
                window.location.href = 'my_order.html'
            } else if ($(this).index() == 1) {
                // alert('收货');
                window.location.href = 'my_order.html'
            } else {
                // alert('评价');
                window.location.href = 'my_order.html'
            }
        })

        // 如果登录了,点击------资料0--地址1--手机2--密码3--收藏4
        $('.menu-list-wrap').on('click', 'ul', function () {
            if ($(this).index() == 0) {
                // alert('资料');
                window.location.href = 'my_profile.html'
            } else if ($(this).index() == 1) {
                // alert('地址');
                window.location.href = 'my_address.html'
            } else if ($(this).index() == 2) {
                // alert('手机');
                window.location.href = 'my_cellphone.html'
            } else if ($(this).index() == 3) {
                // alert('密码');
                window.location.href = 'my_pwd.html'
            } else {
                // alert('收藏');
                window.location.href = 'my_fav.html'
            }
        })

        // 点击安全退出，设置islogin为false
        $('.menu-list-wrap .login-btn').on('click', function () {
            setCookie('islogin', 'false'); //设置islogin为false
            window.location.href = 'my.html'
        })
    } else {
        // 检测到未登录，点击---就转到login.html
        $('.menu-list-wrap .login-btn,.order-name-wrap,.order-status-wrap .item,.menu-list-wrap ul').on('click', function () {
            toLogin()
        })
        $('.menu-list-wrap .login-btn').html('登录/注册')
        $('.nickname').html('昵称：')
    }
    //-------判断是否为登录状态--结束----






})