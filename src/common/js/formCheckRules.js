
var formCheckedRules={
    //整数验证
    numberChecked: function(rule, value, callback){
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if (!value.match(reg)) {
            callback('请输入正确的数字');
        } else if (value > 2147483647){
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
            if ((value+'').match(reg1) || (value+'').match(reg2)) {
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
        if ((value+'').match(reg)){
            callback();
        }else{
            callback('请正确输入院校名称');
        }
    },
    //英文输入验证
    englishStringChecked: function (rule, value, callback) {
        var reg ='^[A-Za-z]+$';
        if(value.match(reg)){
            callback();
        }else{
            callback('请输入英文字符');
        }
    },
    //数组格式不能为空验证
    arrChecked: function (rule, value, callback){
        if(value.length!=0){
            callback();
        }else{
            callback("不能为空");
        }

    },
    //str不为空验证
    strChecked: function (rule, value, callback){
        console.log(value);
        if (value){
            callback();
        }else{
            callback("不能为空");
        }

    }
};
//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
function checkType (str, type) {
  switch (type) {
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'phone':
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
      return /^[0-9]$/.test(str);
    case 'english':
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese':
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower':
      return /^[a-z]+$/.test(str);
    case 'upper':
      return /^[A-Z]+$/.test(str);
    default :
      return true;
  }
}

let formRules = {
  /**
   * 表单验证之是否必须
   * @param msg 提示信息
   * @param trigger 触发方式
   */
  required(msg='请输入内容',trigger='blur,change'){
    return { required: true, message: msg, trigger: trigger }
  },
  //number 类型
  number(msg='输入不是数字',trigger='blur,change'){
    return { type: 'number', required: true, message: msg, trigger: trigger }
  },
  //邮箱
  email(msg='请输入正确的邮箱地址',trigger='blur,change'){
    return { type: 'email', message: msg, trigger: trigger }
  },
  //联系电话
  phone(msg='请输入正确的手机号',trigger='blur'){
    return {
      validator:function (rule, value, callback){
        if(checkType('phone')||checkType('tel')){
          callback();
        }else{
          callback(msg);
        }
      },
      trigger: trigger
    };
  },
  //name 一般名称字段限制不能超过20个字符
  name(msg='不能超过20个字符',trigger='blur,change'){
    return { min:1,max:20, message: msg, trigger: trigger }
  },
  //sort 排序码限制10位数内
  sort(msg='显示顺序不能超过10位数',trigger='blur,change'){
    return { min:1,max:10, message: msg, trigger: trigger }
  }

};

export {
  formCheckedRules,
  formRules
}
