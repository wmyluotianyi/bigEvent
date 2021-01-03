//一开始就询问是不是存在token值
if (!localStorage.getItem('token')) {
    location.href = '/login.html';
}
//更改昵称
$.ajax({
    type: "get",
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    //配置项headers设置请求头
    headers: {
        Authorization: localStorage.getItem("token")
    },
    success: function (res) {
        //如果请求成功就执行以下代码
        if (res.status == 0) {
            // 1、设置欢迎语（有昵称，就使用昵称，没有昵称，使用用户名）
            var name = res.data.username || res.data.nickname;
            $(".username").html(name); //把用户名设置到用户位置
            // 2、设置头像（；）
            //    有图片，使用图片
            if (res.data.user_pic) {
                //设置图片的属性为
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
                $('.avatar').hide();
            }
            //    没有图片，使用名字的首字母
            else {
                //将用户截取第一个字符，变大写
                var t = name.substr(0, 1).toUpperCase();
                $('.avatar').text(t).css('display', 'inline-block');
                $('.layui-nav-img').hide();
            }
        }
    },
    //token值过期
    complete: function (xhr) {
        // xhr.responseJSON  就是返回的数据

        if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {

            // 删除 过期 token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html';
        }
    }
});
//退出
$('#logout').on("click", function () {
    // - 点击退出按钮，询问用户确认要退出;layer提供的弹窗，第一个参数，提示语，第二个参数点击确定后执行的函数
    layer.confirm("您确定要退出吗？", function (index) {
        // - 点击确定，返回登录页，清空token值
        localStorage.removeItem("token");
        location.href = "../login.html";
        layer.close(index); //关闭这个弹窗
    })


})