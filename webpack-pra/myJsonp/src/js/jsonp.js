module.exports = {
    myJsonp : function (param) {
        // var param = {
        //     url : param.url,
        //     data : param.data,
        //     jsonp : param.jsonp,
        //     success : param.success,
        //     targetHost : targetHost,
        //     originHost : originHost
        // };
        
        var isCrossDomain = true;
        var cb = param.jsonp || 'callback';
        var callback = 'jQuery' + new Date().getTime();

        if (param.targetHost === param.originHost) {
            isCrossDomain = false;
        }

        if (isCrossDomain) {
            //跨域
            window[callback] = param.success;
            var oScript = document.createElement('script');
            oScript.src = param.url + '?' + param.data + '&' + cb + '=' + callback;
            document.head.appendChild(oScript);
            document.head.removeChild(oScript);
        } else {
            //不跨域, GET请求
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHttp');
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // jQuery1829378123({})
                        var temp = xhr.responseText.split(callback)[1];
                        var result = temp.substring(1, temp.length - 1);
                        window[callback] = param.success(result);
                    }
                }else {
                    var error = param.error || function () {
                        console.log('jsonp not crossDomain error');
                    };
                    error();
                }
            };

            xhr.open('GET', param.url + '?' + param.data, flag);
            xhr.send();
        }
    }
};