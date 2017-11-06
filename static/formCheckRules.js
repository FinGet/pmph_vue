
var formCheckedRules={
    //整数验证
    numberChecked: function(rule, value, callback){
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if (value.match(reg)) {
            callback();
        } else {
            callback('请输入正确的数字');
        }

    },
     //手机号码和电话验证
    phoneNumberChecked: function(rule, value, callback){
          //固定电话号码验证规则
        var reg1 ="^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$";
        //手机号码验证规则
        var reg2 ="^1[0-9]{10}$";
        if (value.match(reg1) || value.match(reg2)){
            callback();
        }else{
            callback('请正确输入电话号码');
        }
        
    }
}
export {
    formCheckedRules
}