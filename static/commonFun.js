//获取sessionStorage
function getSessionStorage(key,format){
     var data;
    if(sessionStorage.getItem(key)){
        if(format=='json'){
         data=JSON.parse(sessionStorage.getItem(key));
        }else{
          data=sessionStorage.getItem(key);
        }
    }else{
        data=false
    }
    return data;
}
//写入sessionStorage
function setSessionStorage(key,content,format){
    var data;
    if(format=='json'){
       data=JSON.stringify(content);
    }else{
        data=content;
    }
    sessionStorage.setItem(key,data);  
}
var mySessionStorage={
    get:getSessionStorage,
    set:setSessionStorage
}

 /* post数据格式封装 */
 function initPostData(obj){
     let param = new URLSearchParams();
     for(var item in obj){
        param.append(item,obj[item]);
     }
     return param;
 }
 /* 权限比对 */
 function authorityComparison(matchArr,userArr){
  var result=false;
    userArr.forEach(function(num){
        matchArr.forEach(function(elem){
            if(num==elem.meta.authorityId){
                result=true;
            }
        })
    })
    return result;
 }
export {
    mySessionStorage,initPostData,authorityComparison
}