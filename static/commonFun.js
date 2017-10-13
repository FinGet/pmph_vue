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
var mySessionStorage = {
    get: getSessionStorage,
    set: setSessionStorage
}

/* post数据格式封装 */
function initPostData(obj, keyArr) {
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
function authorityComparison(matchArr, userArr) {
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
export {
    mySessionStorage, initPostData, authorityComparison
}