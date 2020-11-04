$(function () {

    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return " 昵称的长度必须在1~6个字符之间"
            }
        }
    })


//    初始化用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                // console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }


//    重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })

//    监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                //在子页面中调用父页面中的方法
                //先得到子页面的window对象，它的父级就是父页面的window对象，它里面的全局变量就是它的属性，它里面的函数就是它的方法
                //但是用文件协议打开依旧会报错，得不到
                window.parent.getUserInfo()
            }
        })
    })


})