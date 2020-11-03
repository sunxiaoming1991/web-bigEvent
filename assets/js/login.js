$(function () {


    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()


    })


    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    //    从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //    通过form.verify()函数自定义校验规则
    layui.form.verify({
        //    自定义了一个叫pwd的校验规则
        pwd: [/[^\s]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //    校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            // console.log(pwd);
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    //监听注册表单提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            return layer.msg('注册成功,请登录')
            $('#link_login').click()

        })

    })

    //    监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //    将登录成功得到的token字符串保存到localStorage中
                //是一个字段，可以唯一标识用户
                //登录之后，会从服务器得到一个token令牌
                //如果访问用户页面，需要携带token,否则无法访问
                //登录就是为了得到token,保存token可以放localStorage,或者sessionStorage,还有cookie里，cookie可以设置保存的时间
                localStorage.setItem('token', res.token)

                location.href = 'index.html'
            }
        })
    })


})