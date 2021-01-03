//登陆注册切换
$("#goto-register").on('click', function () {
    $("#login").hide();
    $("#register").show();
})
$("#goto-login").on('click', function () {
    $("#login").show();
    $("#register").hide();
})
//自定义检验
var layer = layui.layer,
    form = layui.form;
form.verify({
    changdu: [/^\S{6,12}$/, "输入的密码不符合要求！"],
    same: function (val) {
        if ($("#password").val() != val) {
            return "两次输入的密码不一致"
        }
    }
});
//注册功能
$("#register form").on("submit", function (e) {
    //阻止默认事件
    e.preventDefault();
    //收集数据
    var params = $(this).serialize();
    console.log(1111);
    //发送ajax请求。提交数据
    $.ajax({
        type: "post",
        url: "http://ajax.frontend.itheima.net/api/reguser",
        data: params,
        success: function (res) {
            //不管成功与否都进行弹窗
            layer.msg(res.message);
            //业务提醒，登陆成功显示登陆盒子
            if (res.status == 0) {
                //跳转到登陆页面
                $("#login").show();
                $("#register").hide();
            } else {
                //用户名重复，清空用户名
                $('#registerName').val("");
            }
        }
    });
})
//登陆页面
$("#login form").on("submit", function (e) {
    //阻止默认事件
    e.preventDefault();
    //收集数据
    var params = $(this).serialize();
    //发送ajax请求。提交数据
    $.ajax({
        type: "post",
        url: "http://ajax.frontend.itheima.net/api/login",
        data: params,
        success: function (res) {
            layer.msg(res.message);
            console.log('1111');
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem("token", res.taken)
            }
        }
    })
});
// -------------------------------------------登录
// $("#login form").on("submit", function (e) {
//     // 1.阻止默认
//     e.preventDefault();

//     // 2.收集数据
//     var params = $(this).serialize();

//     // 3.提交数据：去哪看？接口文档！
//     $.ajax({
//         url: "http://ajax.frontend.itheima.net/api/login",
//         type: "post",
//         data: params,
//         success: function (res) {
//             layer.msg(res.message);
//             // 登录成功：
//             //          返回token值：一会很多接口都要用，在index.html；
//             //          本地储存：跨页面使用
//             //          res.status==0 后台的设计和 前面学习 状态码 没有关系！
//             if (res.status == 0) {
//                 location.href = "../index.html";
//                 localStorage.setItem("token", res.token);
//             }
//         }
//     })
// });