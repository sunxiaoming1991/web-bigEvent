//每次在调用$.get() $.post()  $.ajax()的时候，都会先隐式调用ajaxPrefilter这个函数。在这个函数中我们可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // return options.url
//    不用写返回值吗？


//统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


})
