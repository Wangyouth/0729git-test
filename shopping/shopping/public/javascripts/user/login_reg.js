$(function () {
    //公共事件
    //密码框后面的--打开--关闭按钮
    $('.van-switch').on('click', function () {
        $('.van-switch').toggleClass('van-switch--oncolor')
        $('.van-switch__node').toggleClass('van-switch--on')

        if ($('.password input').attr('type') == 'password') {
            $('.password input').attr('type', 'text')
        } else {
            $('.password input').attr('type', 'password')
        }
    })
    //顶部点击返回按钮 
    $('.sub-header .back').on('click', function () {
        window.history.back(-1)
    })

    //login事件
    //点击注册--转到注册页面
    $('.to-reg').on('click', function () {
        window.location.href = 'reg.html'
    })

    //reg事件
    //获取图形验证码--点击刷新
    $('.vcode-img img').on('click', function () {
        var imgimg = document.querySelector('.vcode-img').querySelector('img')
        imgimg.src = 'http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&random=' + Math.random()
    })


    // 一些函数
    //手机号未输入提示1.5秒
    function textNone() {
        setTimeout(function () {
            $('.van-toast').css('display', 'none')
        }, 1500)
    }
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

    //注册页面---开始i
    // 短信验证码--开始
    var ttt = true
    $('.code-btn').on('click', function () {
        if (ttt) {
            ttt = false
            let cd = 10
            $('.code-btn').html(cd + '秒后重新发送')
            var timer = setInterval(function () {
                cd--;
                $('.code-btn').html(cd + '秒后重新发送')
                if (cd == 0) {
                    clearInterval(timer)
                    $('.code-btn').html('重新发送验证码')
                    ttt = true
                }
            }, 1000)
        } else { }
    })
    // 短信验证码--结束

    // 点击注册按钮
    $('.sure-btn-reg').on('click', function () {
        var reg = /^1[3-9]+\d{9}$/
        var $tel = $('.cellphone input').val()
        var $pwd = $('.password input').val()
        if ($tel == '') {
            $('.van-toast').css('display', 'block').html('请输入手机号')
            textNone()
        } else if ($tel !== '') {
            if (!reg.test($tel)) {
                $('.van-toast').css('display', 'block').html('手机号格式不正确')
                textNone()
            }
            else if ($pwd == '') {
                $('.van-toast').css('display', 'block').html('请输入密码')
                textNone()
            } else if ($pwd !== '') {

                setCookie('uname', $tel, 10);
                setCookie('pwd', $pwd, 10);
                $('.van-toast').css('display', 'block').html('注册成功,2秒后转登录页')
                textNone()
                setTimeout(function () { window.location.href = 'login.html' }, 1700)

                // console.log(getCookie('uname'));
                // console.log(getCookie('pwd'));

                // $.ajax({
                //     type: "POST",
                //     url: "http://vueshop.glbuys.com/api/home/user/reg?token=1ec949a15fb709370f",
                //     data: {
                //         vcode: 'asvu',
                //         cellphone: $tel,
                //         password: $pwd,
                //     },
                //     success: function (data) {
                //         data = JSON.parse(data)
                //         console.log(data);
                //         console.log(data.status);
                //     }
                // });
            }
        }
    })
    //注册页面---结束

    //登录页面--开始
    $('.sure-btn').on('click', function () {
        let loginname = getCookie('uname');
        let loginpwd = getCookie('pwd');
        var reg = /^1[3-9]+\d{9}$/
        var $tel = $('.code-wrap input').val()
        var $pwd = $('.password input').val()
        if ($tel == '') {
            $('.van-toast').css('display', 'block').html('请输入手机号')
            textNone()
        } else if ($tel !== '') {
            if (!reg.test($tel)) {
                $('.van-toast').css('display', 'block').html('手机号格式不正确')
                textNone()
            }
            else if ($tel !== loginname) {
                $('.van-toast').css('display', 'block').html('手机号码错误')
                textNone()
            } else if ($tel == loginname) {
                if ($pwd == '') {
                    $('.van-toast').css('display', 'block').html('密码错误，请输入密码')
                    textNone()
                } else if ($pwd !== '') {
                    // 密码正确了
                    if ($pwd == loginpwd) {
                        $('.van-toast').css('display', 'block').html('登录成功')
                        textNone()
                        //验证成功登录,就设置一个islogin值，在其他页面判断是否登录了
                        setCookie('islogin', 'true');
                        //跳转到个人中心
                        setTimeout(function () { window.location.href = 'my.html' }, 1700)

                    } else {
                        $('.van-toast').css('display', 'block').html('密码错误，请重新输入密码')
                        textNone()
                    }
                }
            }
        }
    })
    //登录页面----结束




})//加载