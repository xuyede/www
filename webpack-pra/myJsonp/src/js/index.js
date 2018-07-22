define(function (require) {
    var $ = {
        myAjax: function (param) {
            //先获取域名等网络信息
            var protocol = param.url.split('//')[0] + '//',
                targetHost = param.url.split(protocol)[1].split('/')[0],
                originHost = window.location.host;

            // jsonp
            if (param.dataType === 'jsonp') {
                // jsonp模块
                var jsonpTool = require('./jsonp.js'); 
                var obj = {
                    url : param.url,
                    data : param.data,
                    jsonp : param.jsonp,
                    jsonpCallback : param.jsonpCallback,
                    success : param.success,
                    targetHost : targetHost,
                    originHost : originHost
                };
                jsonpTool.myJsonp(obj);
            }
            // ajax 
            else {
                // ajax模块
                var ajaxTool = require('./ajax.js');
                if (targetHost !== originHost) {
                    console.log('ajax can not cross domain');
                    return;
                } else {
                    ajaxTool.ajax(param.type, param.url, param.success, param.data, true);
                }
            } 

        }
    };
    //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su
    $.myAjax({
        type: 'GET', //POST
        url: 'http://127.0.0.1:8001/src/js/getData.php',
        data: 'page=one',
        // dataType: 'jsonp',
        // jsonp: 'cb',
        success: doJSON
    });

    function doJSON (data) {
        console.log(data);
    }
});