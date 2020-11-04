$(function () {

    var layer = layui.layer

    initArtCateList()

    function initArtCateList() {

        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res.data)
                // console.log(res)
                //传参的时候是找res中的data属性，如果写了res.data，data里面没有data属性，所以找不到了
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: "添加文章分类",
            content: $('#dialog-add').html()
            //    注意上面这种思路和写法！

        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('failed!')
                }
                initArtCateList()
                layer.msg('添加成功')
                layer.close(indexAdd)
            }

        })
    })
})