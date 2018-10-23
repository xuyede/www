var org = {

    //异步加载脚本
    loadScript: function (url, callback) {
        'use strict';
        var script = document.createElement('script');
        script.type = 'text/javascript';

        if (script.readyState) {
            //IE
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            //Chrome FF SF
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.head.appendChild(script);
    },
    //取消默认事件
    cancelDefault: function (e) {
        'use strict';
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    //取消冒泡
    stopBubble: function (e) {
        'use strict';
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    //绑定事件
    addEvent: function (element, eventType, handle) {
        'use strict';
        if (element.addEventListener) {
            element.addEventListener(eventType, handle, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventType, function () {
                handle.call(element);
            });
        } else {
            element['on' + eventType] = handle;
        }
    },
    //获取元素样式值
    getStyle: function (element, prop) {
        'use strict';
        if (window.getComputedStyle) {
            return window.getComputedStyle(element, null)[prop];
        } else {
            return element.currentStyle[prop];
        }
    },
    //获取可视窗口的宽高
    getViewportOffset: function () {
        'use strict';
        if (window.innerWidth) {
            //IE9以上
            return {
                w: window.innerWidth,
                h: window.innerHeight
            };
        }
        //IE9以下 
        else {
            //怪异模式
            if (document.compatMode === 'BackCompat') {
                return {
                    w_bc: document.body.clientWidth,
                    h_bc: document.body.clientHeight
                };
            }
            //正常模式 
            else {
                return {
                    w_ie8: document.documentElement.clientWidth,
                    h_ie8: document.documentElement.clientHeight
                };
            }
        }
    },
    //获取页面滚动条滚动距离
    getScrollOffset: function () {
        'use strict';
        if (window.pageXOffset || window.pageYOffset) {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        } else {
            return {
                x_ie: document.body.scrollLeft + document.documentElement.scrollLeft,
                y_ie: document.body.scrollTop + document.documentElement.scrollTop
            };
        }
    },
    //数组去重
    unique: function (arr) {
        'use strict';
        var newArr = arr.sort(function (a, b) {
            return a - b;
        }).reduce(function (baton, curVal) {
            var len = baton.length;
            if (len === 0 || baton[len - 1] !== curVal) {
                baton.push(curVal);
            }
            return baton;
        }, []);
        return newArr;
    },
    //继承原型链(圣杯模式)
    inherit: (function () {
        'use strict';
        var temp = function () { };
        return function (origin, iTarget) {
            temp.prototype = iTarget.prototype;
            origin.prototype = new temp();
            origin.prototype.constructor = origin;
            origin.prototype.uber = iTarget;
        };
    }()),
    //继承全部,包括原型和origin内容
    extend: function (origin) {
        'use strict'
        var result = function () {
            origin.apply(this, arguments)
        }
        this.inherit(result, origin)
        return result
    },
    //单例继承
    singleInherit : function (origin) {
        'use strict'
        var singleResult = (function () {
            var instance = null
            return function () {
                if (instance != null) {
                    return instance
                }
                instance = this
                origin && origin.apply(this, arguments)
            }
        }())
        origin && this.inherit(singleResult, origin)
        return singleResult
    },
    //深度克隆
    deepClone: function (origin, iTarget) {
        'use strict';
        var Target = iTarget || {},
            toStr = Object.prototype.toString,
            isArr = '[object Array]';

        for (var prop in origin) {
            if (origin.hasOwnProperty(prop)) {
                if (typeof (origin[prop]) === 'object' && origin[prop] !== null) {
                    Target[prop] = toStr.call(origin[prop]) === isArr ? [] : {};
                    org.deepClone(origin[prop], Target[prop]);
                } else {
                    Target[prop] = origin[prop];
                }
            }
        }
        return Target;
    },
    //细化typeof
    type: function (target) {
        'use strict';
        var box = {
            '[object String]': 'string object',
            '[object Number]': 'number object',
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Null]': 'null'
        },
            ret = typeof (target);
        if (ret === 'object') {
            var str = Object.prototype.toString.call(target);
            return box[str];
        } else {
            return ret;
        }
    },
    //防抖
    deBounce: function (handle, delay) {
        'use strict';
        var timer = null;
        return function () {
            var self = this,
                arg = arguments;
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                handle.apply(self, arg);
            }, delay);
        };
    },
    //节流
    throttle: function (handle, wait) {
        'use strict';
        var nowTime = 0;
        return function () {
            var lastTime = new Date().getTime();
            if (lastTime - nowTime > wait) {
                handle.apply(this, arguments);
                nowTime = lastTime;
            }
        };
    },
    //通过class获取某父节点的子元素，兼容IE9以下
    getByClass: function (element, _class) {
        'use strict';
        var aEle = element.getElementsByTagName('*'),
            aResult = [],
            len = aEle.length;

        for (var i = 0; i < len; i++) {
            if (aEle[i].className.indexOf(_class) !== -1) {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    },
    //缓冲运动框架 (dom, {style}, callback)
    startMove: function (elem, obj, func) {
        'use strict';
        var self = this;
        window.clearInterval(elem.timer);
        elem.timer = window.setInterval(function () {
            var flag = true;
            for (var prop in obj) {
                var speed = 0,
                    curVal = 0;
                if (prop === 'opacity') {
                    curVal = Math.round(parseFloat(self.getStyle(elem, prop)) * 100);
                } else {
                    curVal = parseInt(self.getStyle(elem, prop));
                }

                speed = (obj[prop] - curVal) / 5;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (curVal !== obj[prop]) {
                    flag = false;
                }

                if (prop === 'opacity') {
                    //IE8及以下
                    elem.style.filter = 'alpha(opacity=' + (curVal + speed) + ')';
                    elem.style[prop] = (curVal + speed) / 100;
                } else {
                    elem.style[prop] = curVal + speed + 'px';
                }
            }
            if (flag) {
                window.clearInterval(elem.timer);
                if (func) {
                    func();
                }
            }
        }, 30);
    },
    //弹性运动框架
    elasticMove: function (obj, target) {
        'use strict';
        window.clearInterval(obj.timer);
        var speed = 30,
            u = 0.7,
            self = this;
        obj.timer = window.setInterval(function () {
            var curVal = parseInt(self.getStyle(obj, 'left')),
                a = (target - curVal) / 7;

            speed += a;
            //摩擦力减少速度
            speed *= u;

            if (Math.abs(speed) <= 1 && Math.abs(target - curVal) <= 1) {
                obj.style.left = target + 'px';
                window.clearInterval(obj.timer);
            } else {
                obj.style.left = curVal + speed + 'px';
            }
        }, 20);
    },
    //ajax
    ajaxFunc: function (method, url, callback, data, flag) {
        'use strict';
        var xhr = null;
        //兼容IE
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    window.console.log('ajax error');
                }
            }
        };
        method = method.toUpperCase();
        if (method === 'GET') {
            var date = new Date(),
                time = date.getTime();
            xhr.open(method, url + '?' + data + '&time=' + time, flag);
            xhr.send();
        } else if (method === 'POST') {
            xhr.open(method, url, flag);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    },
    //cookie转对象
    cookieToObj: function (cookie) {
        var str = cookie,
            arr = str.split('; ');

        var newArr = arr.reduce(function (baton, curVal) {
            var temp = curVal.split('=');
            for (var k in baton) {
                if(k === temp[0]){
                    temp[0] = temp[0] + 1;
                }
            }
            baton[temp[0]] = temp[1];
            return baton;
        }, {});
        return newArr;
    },
    //设置cookie,可链式调用
    setCookie : function (key, value, time) {
        document.cookie = key + '=' + value + ';max-age=' + time;
        return this;
    },
    //删除cookie
    removeCookie : function (key) {
        return this.setCookie(key, '', -1);
    },
    //获取某个cookie的值
    getCookie : function (key, callback) {
        var str = document.cookie,
            arr = str.split('; '),
            len = arr.length;

        for (var i = 0 ; i < len; i++) {
            var itemArr = arr[i].split('=');

            if (itemArr[0] === key) {
                callback(itemArr[1]);
                return this;
            }
        }
        callback('undefined');
        return this;
    },
    //对象合并, 参数 => Object.assign
    _extends : Object.assign ||
        function (target) {  // {} RULES method
            for (var i = 1, len = arguments.length; i < len; i ++) {
                // RULES method
                var source = arguments[i]
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key]
                    }
                }
            }
        },
    // fetch(get)
    fetchGet : function(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    // fetch(post)
    fetchPost = function(url, data){
        return new Promise((resolve, reject) => {
            let fetchConfig = {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)
            }

            fetch(url, fetchConfig)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    // fetch(put)
    fetchPut = function (url, data) {
        return new Promise((resolve, reject) => {
            let fetchConfig = {
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)
            }

            fetch(url, fetchConfig)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    // fetch(delete)
    fetchDelete = function(url) {
        return new Promise((resolve, reject) => {
            let fetchConfig = {
                method : 'DELETE',
                headers : {
                    'Content-type' : 'application/json'
                }
            }

            fetch(url, fetchConfig)
                .then(response => response.json())
                .then(data => resolve('delete success'))
                .catch(err => reject(err))
        })
    }
};