'use strict';
//封装type,细化typeof
function type(target) {
    var box = {
            '[object String]': 'string object',
            '[object Number]': 'number object',
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Null]': 'null'
        },
        ret = typeof(target);
    if (ret === 'object') {
        var str = Object.prototype.toString.call(target);
        return box[str];
    } else {
        return ret;
    }
}

//深度克隆(理解)
function deepClone(Origin, Target) {
    var Target = Target || {},
        toStr = Object.prototype.toString,
        isArr = '[object Array]';
    for (var k in Origin) {
        if (Origin.hasOwnProperty(k)) {
            if (origin[k] !== 'null' && typeof(Origin[k]) == 'object') {
                Target[k] = (toStr.call(Origin[k]) == isArr) ? [] : {};
                deepclone(Origin[k], Target[k]);
            } else {
                Target[k] = Origin[k];
            }
        }
    }
}

//雅虎封装继承方法：
var inherit = (function() {
    var Temp = function() {};
    //-- > 私有化变量
    return function(Origin, Target) {
        Temp.prototype = Target.prototype;
        Origin.prototype = new Temp();
        Origin.prototype.constructor = Origin;
        Origin.prototype.uber = Target;
    };
}());

//数组去重，原型链上操作
Array.prototype.unique = function() {
    var result = this.sort(function(a, b) {
        return a - b;
    }).reduce(function(baton, curVal) {
        var length = baton.length;
        if (length === 0 || baton[length - 1] != curVal) {
            baton.push(curVal);
        }
        return baton;
    }, [])
    return result;
}



Element.prototype.insertAfter = function(origin, target) {
    var temp = target.nextElementSibling;
    if (temp == null) {
        this.appendChild(origin);
    } else {
        this.insertBefore(origin, temp);
    }
    return origin;
}

//倒数定时器
var countDown = function(minute, second) {
    console.log('倒计时开始');
    var myTime = new Date(),
        num = 0;
    var timer = setInterval(function() {
        myTime.setSeconds(59);
        if (second == 0) {
            minute -= 1;
        }
        second = myTime.getSeconds() - num++;
        if (num == 60) {
            num = 0;
            if (minute == 0 && second == 0) {
                clearInterval(timer);
                console.log('时间到');
            }
        }
        console.log(minute, second);
    }, 1000);

}

//时间显示
var DisplayDate = function() {
    var timer = setInterval(function() {
        var date = new Date();
        var str = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' +
            date.getHours() + '时' + date.getMinutes() + '分' + date.getSeconds() + '秒';
        console.log(str);
    }, 1000)
    return 'time is:';
}

//获取页面滚动条距离
function getScrollOffset() {
    if (window.pageXOffset || window.pageYOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x1: document.body.scrollLeft + document.documentElement.scrollLeft,
            y1: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取可视窗口的宽高
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

//查看样式
function getStyle(ele, name) {
    if (ele.currentStyle) {
        return ele.currentStyle[name];
    } else {
        return window.getComputedStyle(ele, null)[name];
    }
}

/*
//原型链操作

Element.prototype.getStyle = function(name) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(this, null)[name];
    } else {
        return this.currentStyle[name];
    }
}

*/

//绑定事件
function addEvent(element, eventType, handle) {
    if (element.addEventListener) {
        element.addEventListener(eventType, handle, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventType, function() {
            handle.call(this);
        });
    } else {
        element['on' + eventType] = handle;
    }
}

//取消冒泡
function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//取消默认事件
function cancelHandler(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

//异步加载脚本
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
        //IE
        script.onreadystatechange = function() {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        //Chrome FF SF
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    document.head.appendChild(script);
}

//弹性运动
function elasticMove(obj, target) {
    var speed = 30,
        a,
        u = 0.7;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var curVal = parseInt(org.getStyle(obj, 'left'));
        a = (target - curVal) / 7;
        speed += a;
        speed *= u;
        if (Math.abs(speed) <= 1 && Math.abs(target - curVal) <= 1) {

            obj.style.left = target + 'px';
            clearInterval(obj.timer);
        } else {
            obj.style.left = curVal + speed + 'px';
        }
    }, 30);
}
//碰撞运动
function crashMove(obj) {
    clearInterval(obj.timer);
    var xSpeed = 8,
        ySpeed = 12,
        g = 9;
    obj.timer = setInterval(function() {
        ySpeed += g;
        var viewPort = org.getViewportOffset(),
            curValX = parseInt(org.getStyle(obj, 'left')),
            curValY = parseInt(org.getStyle(obj, 'top')),
            newXSpeed = xSpeed + curValX,
            newYSpeed = ySpeed + curValY;

        if (newXSpeed >= viewPort.w - obj.offsetWidth) {
            //右
            xSpeed *= -1;
            xSpeed *= 0.8;
            ySpeed *= 0.8;
            newXSpeed = viewPort.w - obj.offsetWidth;
        } else if (newYSpeed <= 0) {
            //上
            ySpeed *= -1;
            xSpeed *= 0.8;
            ySpeed *= 0.8;
            newYSpeed = 0;
        } else if (newXSpeed <= 0) {
            //左
            xSpeed *= -1;
            xSpeed *= 0.8;
            ySpeed *= 0.8;
            newXSpeed = 0;
        } else if (newYSpeed >= viewPort.h - obj.offsetHeight) {
            //下
            ySpeed *= -1;
            xSpeed *= 0.8;
            ySpeed *= 0.8;
            newYSpeed = viewPort.h - 100;
        }

        obj.style.top = newYSpeed + 'px';
        obj.style.left = newXSpeed + 'px';

    }, 20);
}