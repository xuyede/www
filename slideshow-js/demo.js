var bigPicUl = document.getElementsByClassName('big-pic')[0],
    bigPicLi = bigPicUl.getElementsByTagName('img'),
    aLiarr = Array.prototype.slice.call(bigPicLi, 0),
    xDis = getPos(),

    left_btn = document.getElementsByClassName('left-btn')[0],
    right_btn = document.getElementsByClassName('right-btn')[0],
    l_btn = document.getElementsByClassName('l-btn')[0],
    r_btn = document.getElementsByClassName('r-btn')[0],

    smlPicUl = document.getElementsByClassName('sml-pic')[0],
    smlPicLi = smlPicUl.getElementsByTagName('img'),
    smlpArr = Array.prototype.slice.call(smlPicLi, 0),

    headTimer = null,
    now = 1;

init();

function init() {
    'use strict';
    showBtn();
    smlpBindEvent();
    mainloop();
}

//显示、隐藏左右按钮
function showBtn() {
    'use strict';
    org.addEvent(left_btn, 'mouseenter', function() {
        clearInterval(headTimer);
        org.startMove(l_btn, { 'opacity': 100 });
    });
    org.addEvent(left_btn, 'mouseleave', function() {
        startTimer();
        org.startMove(l_btn, { 'opacity': 0 });
    });
    org.addEvent(right_btn, 'mouseenter', function() {
        clearInterval(headTimer);
        org.startMove(r_btn, { 'opacity': 100 });
    });
    org.addEvent(right_btn, 'mouseleave', function() {
        startTimer();
        org.startMove(r_btn, { 'opacity': 0 });
    });

    btnBindEvent();
}

//开启定时器
function startTimer() {
    'use strict';
    headTimer = setInterval(function() {
        start();
    }, 2000);
}

//主循环
function mainloop() {
    'use strict';
    bigPicUl.style.left = -400 + 'px';
    headTimer = setInterval(function() {
        start();
    }, 2000);
}

//监听按钮点击事件
function btnBindEvent() {
    'use strict';
    var len = aLiarr.length;
    console.log('len:', len);
    org.addEvent(l_btn, 'click', function() {
        clearInterval(headTimer);
        now--;
        change();
    });
    org.addEvent(r_btn, 'click', function() {
        clearInterval(headTimer);
        now++;
        change();
    });
}

//小图点击事件
function smlpBindEvent() {
    'use strict';
    smlpArr.forEach(function(ele, index) {
        org.addEvent(ele, 'mouseenter', function() {
            clearInterval(headTimer);
            if ((index + 1) !== now) {
                org.startMove(ele, { 'opacity': 80 });
            }
        });
        org.addEvent(ele, 'mouseleave', function() {
            if ((index + 1) !== now) {
                org.startMove(ele, { 'opacity': 30 });
            }
            startTimer();
        });
        org.addEvent(ele, 'click', function() {
            clearInterval(headTimer);
            now = index + 1;
            change();
        });
    });
}

//点击触发滚动
function change() {
    'use strict';
    if (now < 0) {
        bigPicUl.style.left = -1600 + 'px';
        now = 3;
    }
    if (now > 5) {
        bigPicUl.style.left = -400 + 'px';
        now = 2;
    }
    smlPicMove();
    // 0 400 800 1200 1600 2000
    org.startMove(bigPicUl, { 'left': xDis[now] * -1 });
}

//时间间隔滚动
function start() {
    'use strict';
    now++;
    if (now > 5) {
        bigPicUl.style.left = -400 + 'px';
        now = 2;
    }
    change();
}

//小图样式改变
function smlPicMove() {
    'use strict';
    var self = now;
    var arr = Array.prototype.slice.call(smlPicLi, 0);
    for (var i = 0, len = arr.length; i < len; i++) {
        arr[i].className = '';
        arr[i].removeAttribute('style');
    }
    // 0 1 2 3 4 5   len:6
    // 3 0 1 2 3 0
    if (self === 0) {
        self = 4;
    }
    arr[(self - 1) % 4].className = 'active';
}

//获取图片位置
function getPos() {
    'use strict';
    var arr = [];
    for (var i = 0, len = aLiarr.length; i < len; i++) {
        arr.push(aLiarr[i].offsetLeft);
    }
    return arr;
}