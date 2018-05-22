var org = {
    //绑定事件
    addEvent: function(element, eventType, handle) {
        'use strict';
        if (element.addEventListener) {
            element.addEventListener(eventType, handle, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventType, function() {
                handle.call(element);
            });
        } else {
            element['on' + eventType] = handle;
        }
    },
    //获取元素样式值
    getStyle: function(element, prop) {
        'use strict';
        if (window.getComputedStyle) {
            return window.getComputedStyle(element, null)[prop];
        } else {
            return element.currentStyle[prop];
        }
    },

    //缓冲运动框架
    startMove: function(elem, obj, func) {
        'use strict';
        var self = this;
        window.clearInterval(elem.timer);
        elem.timer = window.setInterval(function() {
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

};