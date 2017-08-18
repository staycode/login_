//登录提交地址
var Post_url = "http://114.215.242.163:9999/";
var LoginService = new MVVM.Service({
    ajaxCall: function(data,options) {
        //登录验证
        debugger;
        appcan.request.ajax({
            url: Post_url + "mvvm/login",
            data: data,
            type: "POST",
            success: function(data) {
                 debugger;
                //data格式{status: 0 ;msg: "xxx"}
                if(typeof(data) == "string") {
                    var data = JSON.parse(data);
                    options.success(data);
                } 
            },
            error: function(err) {
                 debugger;
                 options.error(err);
            }
        });
    }
});

//登录模型
var LoginModel = new(MVVM.Model.extend({
    defaults: {
        "username": "admin",
        "password": "admin"
    },
    initialize: function() {
        return;
    },
    //前端登录认证
    validate: function(attrs) {
        var username = attrs.username;
        var password = attrs.password;
        if(username == "" || password == "") {
            return "请输入用户名密码";
        } else if(password.length < 5) {
            return "密码长度不能少于5";
        }

    },
    sync:function(method,model,options){
        switch (method){
            case "create":
                debugger;
               // options.success({status: 0 ;msg: "xxx"});
               LoginService.request(model.attributes,options);
            
        }
        
    }
}));

// LoginModel.bind("invalid", function(model, error) {
    // alert(error);
// });

var LoginViewModel = new(MVVM.ViewModel.extend({
    el: "#main_box",
    events: {
        //登录按钮
        "tap #login_btn": function(ev, param) {
            var self = this;
            if(!LoginModel.isValid()) {
                alert(LoginModel.validationError);               
            }else{
                LoginModel.save({},{
                    "success":function(model,data,options){
                        debugger;
                        console.log(data);
                        if(data.status==0){
                            
                        }
                        alert(data.msg)
                    },
                    "error":function(a,b,c,d){
                        debugger;
                        console.log(a+"  "+b+"  "+c+"  "+d)
                    }
                });
            }
        }
    },
    model: LoginModel,
}));