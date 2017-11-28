
import 'url-search-params-polyfill'
//获取sessionStorage
function getSessionStorage(key, format) {
    var data;
    if (sessionStorage.getItem(key)) {
        if (format == 'json') {
            data = JSON.parse(sessionStorage.getItem(key));
        } else {
            data = sessionStorage.getItem(key);
        }
    } else {
        data = false
    }
    return data;
}
//写入sessionStorage
function setSessionStorage(key, content, format) {
    var data;
    if (format == 'json') {
        data = JSON.stringify(content);
    } else {
        data = content;
    }
    sessionStorage.setItem(key, data);
}
export var mySessionStorage = {
    get: getSessionStorage,
    set: setSessionStorage
}

/* post数据格式封装 */
export function initPostData(obj, keyArr) {
    var paramdata = new URLSearchParams();

    if (!keyArr) {
        for (var item in obj) {
          if ((typeof obj[item])=='object'){
            if ((typeof obj[item][0]) == 'object'){
              for (var i in obj[item]){
                paramdata.append(item, JSON.stringify(obj[item][i]));
              }
            }else{
              paramdata.append(item, JSON.stringify(obj[item]));
            }
          }else{
            paramdata.append(item, obj[item]);
          }
            
            console.log(item);
        }
    }else{
        keyArr.forEach(function(str){
            paramdata.append(str,obj[str]);
        })
    }
    return paramdata;
}
/* 权限比对 */
export function authorityComparison(matchArr, userArr) {
    var result = false;
    matchArr.forEach(function (elem) {
        userArr.forEach(function (num) {
            if (num && num == elem.meta.authorityId) {
                result = true;
            }
        })
    })
    return result;
}
/* 教材申报权限判断 */
export function materialPower(num) {
  var userData= getSessionStorage('currentUser', 'json')||{};
  var str = userData.materialPermission;
  //如果传的是数字
  if(!isNaN(parseInt(num))){
    return str[num]==1;
  }
  //如果是数组,只要匹配到任一一项则返回true
  if(Object.prototype.toString.call(num)=='[object Array]'){
    for(let i = 0, len = num.length; i < len; i++){
      if(!isNaN(parseInt(num[i]))){//如果不是数字
        return false;
      }
      if(str[num[i]]==1){//匹配到任一一项则返回true
        return true;
      }
    }
    return false;
  }
  //如果传的参数不是数字类型，也不是数组类型则直接返回false
  return false;
}
/**=================================================================
 cookie相关
 =================================================================*/
export let Cookie = {
  /**
   * getCookie
   * @param name
   * @returns {*}
   */
  get(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (arr[0] == name)return arr[1];
    }
    return "";
  },

  /**
   * 添加cookie
   * @param name
   * @param value
   * @param expiresHours
   * @param domain
   */
  set(name, value, expiresHours,domain) {
    var cookieString = name + "=" + (!!value?value:'');
    var date = new Date();

    if(domain!=undefined)
      domain=";domain="+domain;
    else
      domain='';

    date.setTime(date.getTime() + expiresHours * 3600 * 1000);
    cookieString = cookieString + domain+"; path=/; expires=" + date.toGMTString();

    document.cookie = cookieString;
  },
  /**
   * 删除cookie
   * @param name
   */
  remove(name){
    this.set(name,'',-1);
  },
};

/**=================================================================
  时间相关
  =================================================================*/

/**
 * 将时间戳转化为几天前,几小时前，几分钟前形式
 * @param dateTimeStamp 时间戳
 * @returns {*|string}
 */
export function getDateDiff(dateTimeStamp){
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  var result;
  if(monthC>=1){
    result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else
    result="刚刚";
  return result;
}

/**
 * 转换标准时间为时间戳：例如将2016/1/20 19:59:30转换成时间戳形式1484913570000
 * @param dateStr
 * @returns {number}
 */
export function getDateTimeStamp(dateStr){
  return Date.parse(dateStr.replace(/-/gi,"/"));
}
/**
 * 时间格式方法
 *
 * @param {any} timeStamp  时间戳，秒级/毫秒级
 * @param {any} type 格式化时间类型，默认  Y-M-D H:I:S
 * @returns {string} formatTime 格式化后的时间 例如： 2017-05-05 12:09:22
 */
export function formatDate(nS) {
  if(!nS){
    return "";
  }
  var date=new Date(nS);
  var year=date.getFullYear();
  var mon = date.getMonth()+1;
  var day = date.getDate();
  var hours = date.getHours();
  var minu = date.getMinutes();
  var sec = date.getSeconds();


  return year + '-' +(mon<10?'0'+mon:mon) + '-' +(day<10?'0'+day:day) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minu < 10 ? '0' + minu : minu )+ ':' + (sec < 10 ? '0' + sec : sec);
}
/**
 * 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
 * @returns {string}
 */
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

/**=================================================================
 输入相关
 =================================================================*/
/**
 * Created by huang on 2017/9/10.
 */
/**
 * 获取当前textarea光标位置
 */
export function getCursorPosition(textarea) {
  var rangeData = {text: "", start: 0, end: 0 };
  textarea.focus();
  if (textarea.setSelectionRange) { // W3C
    rangeData.start= textarea.selectionStart;
    rangeData.end = textarea.selectionEnd;
    rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
  } else if (document.selection) { // IE
    var i,
      oS = document.selection.createRange(),
      // Don't: oR = textarea.createTextRange()
      oR = document.body.createTextRange();
    oR.moveToElementText(textarea);
    rangeData.text = oS.text;
    rangeData.bookmark = oS.getBookmark();
    // object.moveStart(sUnit [, iCount])
    // Return Value: Integer that returns the number of units moved.
    for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
      // Why? You can alert(textarea.value.length)
      if (textarea.value.charAt(i) == '/n') {
        i ++;
      }
    }
    rangeData.start = i;
    rangeData.end = rangeData.text.length + rangeData.start;
  }
  return rangeData;
}

/**
 *得到 Textarea 元素光标位置，当Textarea 中的光标丢失了，再设置回来时
 */
export function setCursorPosition(textarea, rangeData) {
  if(!rangeData) {
    alert("You must get cursor position first.")
  }
  if (textarea.setSelectionRange) { // W3C
    textarea.focus();
    textarea.setSelectionRange(rangeData.start, rangeData.end);
  } else if (textarea.createTextRange) { // IE
    var oR = textarea.createTextRange();
    // Fixbug :
    // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
    if(textarea.value.length === rangeData.start) {
      oR.collapse(false)
      oR.select();
    } else {
      oR.moveToBookmark(rangeData.bookmark);
      oR.select();
    }
  }
}

/**
 *获取HTML中的纯文本信息
 */
export function getHTMLText(str) {
  str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
  //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
  str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
  str=str.replace(/\s/g,''); //将空格去掉
  return str;
}

/**
 * 数组或对象递归遍历 （其中如果参数是数组，那么数组元素应该是对象形式）
 * @param objOrList 要递归遍历的对象 or 数组
 * @param children 子节点字段
 * @param fn 处理函数
 */
export function recurveList(objOrList,children,handleFn){
  children = children?children:'children';
  for(var key in objOrList){
    if(handleFn){
      handleFn(objOrList[key],key)
    }
    if(objOrList[key][children] && objOrList[key][children].length > 0){
      recurveList(objOrList[key][children],children,handleFn);
    }
  }
}

/**
 * 处理接口返回的msg 将返回错误信息中的====>去掉
 */
export function handleMsg(msg) {
 return this.replace(/(\S*)===>/,'');
}


export let Browser = (function () {

  var ua = navigator.userAgent.toLowerCase(),s;
  var B = {
    ie 			: (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))? parseInt(s[2]):false,
    firefox 	: (s =ua.match(/firefox\/([\d.]+)/))? parseInt(s[1]):false,
    chrome 		: (s = ua.match(/chrome\/([\d.]+)/))?parseInt(s[1]):false,
    opera 		: (s = ua.match(/opera.([\d.]+)/))?parseInt(s[1]):false,
    safari 		: (s = ua.match(/version\/([\d.]+).*safari/))?parseInt(s[1]):false,
    android		: (s=ua.match(/android/))?s:false,
    iphone 		: (s=ua.match(/iphone os/))?s:false,
    ipad 		: (s=ua.match(/ipad/))?s:false,
    isWin32 	: /win32/i.test(window.navigator.platform),
    isWeixin 	: (s=ua.match(/MicroMessenger/i))?!!s:false, //判断是否是在微信浏览器里面
    isUcweb 	: (s=ua.match(/ucbrowser/))?!!s:false,
    isMqq 		: (s=ua.match(/mqqbrowser/))?!!s:false, //是否是手机qq浏览器
    isWeiBo 	: (s=ua.match(/__weibo__/))?!!s:false, //是否微博浏览器
  };
  B.ios = B.ipad || B.iphone;//判断是否是ios

  return B;
})();

/**
 * 字符串格式验证
 */
//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
export function checkType (str, type) {
  str=str?str.toString():'';
  switch (type) {
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'phone':
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
      return /^\+?[1-9][0-9]*$/.test(str);
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
