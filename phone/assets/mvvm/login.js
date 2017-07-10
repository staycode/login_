var LoginService = new MVVM.Service({
    // validate : function(data) {
        // return data.status;
        // console.log(data.status)
    // },
    ajaxCall : function(data) {
        
        //登录验证
        appcan.request.ajax({
            url : "http://114.215.242.163:9999/mvvm/login",
            data : data,
            type : "POST",
            success : function(data) {               
                var json = JSON.parse(data);
                if(json.status == 0){
                    alert(json.msg);
                }else if(json.status == 1){
                    alert(json.msg);
                }else {
                    alert("登录失败")
                }                             
            },
            error : function(err) {
                alert("登录失败！");

            }
        });
    }
});


var LoginModel = new(MVVM.Model.extend({
    defaults : {
        "username" : "admin",
        "password" : "admin"
    },
    initialize : function() {
        return;
    }
}));

var LoginViewModel = new(MVVM.ViewModel.extend({
    // initialize : function() {
        // this.model.view = this;
    // },
    el : "#main_box",
    events : {
        "tap .btn" : function(ev, param) {
            var self = this;
            var username = self.model.get('username');
            var password = self.model.get('password');
            // alert(username);
            if(username == ""|| password == ""){
                alert("请输入用户名密码");
                return false;
            }
            var data = {"username":username,"password":password};
            data = eval(data);
            //console.log(data)
            LoginService.ajaxCall(data)

        }
    },
    model : LoginModel,
}));
