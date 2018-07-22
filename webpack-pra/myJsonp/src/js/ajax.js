module.exports = {
    ajax : function (method, url, callback, data, flag) {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                }
            }
        };

        method = method.toUpperCase();
        if (method === 'GET') {
            xhr.open(method, url + '?' + data, flag);
            xhr.send();
        } else if (method === 'POST') {
            xhr.open(method, url, flag);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    }
};