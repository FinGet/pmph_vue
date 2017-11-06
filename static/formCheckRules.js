
var formCheckedRules={
    //整数验证
    numberChecked: (rule, value, callback) => {
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if (value.match(reg)) {
            callback();
        } else {
            callback('请输入正确的数字');
        }

    },
     //手机号码和电话验证
    phoneNumberChecked: (rule, value, callback) => {

        
    }
}
export {
    formCheckedRules
}