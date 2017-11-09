
var formCheckedRules={
    //整数验证
    numberChecked: function(rule, value, callback){
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if (!value.match(reg)) {
            callback('请输入正确的数字');          
        } else if (value >= 2147483647){
            callback('输入数字过大');
        }else{
            callback()
        }

    },
     //手机号码和电话验证
    phoneNumberChecked: function(rule, value, callback){
          //固定电话号码验证规则
        var reg1 ="^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$";
        //手机号码验证规则
        var reg2 ="^1[0-9]{10}$";
        if(value){
            if (value.match(reg1) || value.match(reg2)) {
                callback();
            } else {
                callback('请正确输入电话号码');
            }
        } else{
            callback();
        }
    },

    //中文输入验证
    chinaStringChecked: function (rule, value, callback) {
        var reg ="^[\u4e00-\u9fa5]+$";
        if (value.match(reg)){
            callback();
        }else{
            callback('请正确输入院校名称');
        }
    }
}
export {
    formCheckedRules
}