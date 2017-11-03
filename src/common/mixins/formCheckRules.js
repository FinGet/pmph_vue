
var formCheckedRules={
    //整数验证
    numberChecked: (rule, value, callback) => {
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if (value.match(reg)) {
            callback();
        } else {
            callback('请输入数字');
        }

    },

}
export {
    formCheckedRules
}