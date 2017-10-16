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
            paramdata.append(item, obj[item]);
            console.log(item);
        }
    }
    else{
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

/**=================================================================
  时间相关
  =================================================================*/

/**
 * 将时间戳转化为几天前,几小时前，几分钟前形式
 * @param dateTimeStamp 时间戳
 * @returns {*|string}
 */
export function getDateDiff(dateTimeStamp){
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
