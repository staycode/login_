var post_url = "http://114.215.242.163:9999/";
var LoginService = new MVVM.Service({
    ajaxCall: function(data) {
        //登录验证
        appcan.request.ajax({
            url: post_url + "mvvm/login",
            data: data,
            type: "POST",
            success: function(data) {
                //data格式{status: 0 ;msg: "xxx"}               
                var json = JSON.parse(data);
                if(json.status == 0) {
                    alert(json.msg);
                } else if(json.status == 1) {
                    alert(json.msg);
                } else {
                    alert("登录失败")
                }
            },
            error: function(err) {
                alert("登录失败！");

            }
        });
    }
});

var LoginModel = new(MVVM.Model.extend({
    defaults: {
        "username": "admin",
        "password": "admin"
    },
    initialize: function() {
        return;
    },
    validate: function(attrs) {
        var username = attrs.username;
        var password = attrs.password;
        if(username == "" || password == "") {
            return "请输入用户名密码";
        } else if(password.length < 5) {
            return "密码长度不能少于5";
        }
        // var reg = /^[a-z | A-Z]\w{5,15}/;
        // if(!reg.test(password)) {
            // return "密码只能由数字和字母组成";
        // }
    }
}));

LoginModel.bind("invalid", function(model, error) {
    alert(error);
});

var LoginViewModel = new(MVVM.ViewModel.extend({
    el: "#main_box",
    events: {
        //登录按钮
        "tap #login_btn": function(ev, param) {
            var self = this;
            var username = self.model.get("username");    
            var password = self.model.get("password");
            var data = {"username":username,"password":password};
            console.log(data);
            LoginService.ajaxCall(data);
            LoginModel.save();
        }
    },
    model: LoginModel,
}));