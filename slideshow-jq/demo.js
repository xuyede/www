'use strict';
var bigPicUl = $('.big-pic'),
    imgInBigPic = $('.big-pic img'),
    BimgPos = getPos($.makeArray(imgInBigPic)),
    //imgInBigPic.get()
    btnLeft = $('.left-btn'),
    btnRight = $('.right-btn'),
    btnL = $('.l-btn'),
    btnR = $('.r-btn'),
    smlPicUl = $('.sml-pic'),
    imgInSmlPic = $('.sml-pic img'),
    headTimer = null,
    now = 1;

init();
//入口
function init() {
    bigPicUl.css('left', '-400px');
    showBtn();
    bindSmlPic();
    startTimer();
}

//小图切换
function smlPicChange() {
    var index = (now - 1) % 4;
    imgInSmlPic.removeClass('active').eq(index).addClass('active');
}

//小图绑定事件
function bindSmlPic() {
    // 0 1 2 3
    smlPicUl.on('click', 'img', function() {
        now = $(this).index() + 1;
        change();
        smlPicChange();
    });
    smlPicUl.on('mouseleave', function() {
        startTimer();
    });
    smlPicUl.on('mouseenter', function() {
        window.clearInterval(headTimer);
    });
}

//大图轮播
function change() {
    //右边界限
    if (now > 5) {
        bigPicUl.css('left', '-400px');
        now = 2;
    }
    //左边界限
    if (now < 0) {
        bigPicUl.css('left', '-1600px');
        now = 3;
    }
    bigPicUl.stop().animate({ left: BimgPos[now] * -1 }, 500);
}
//获取位置
function getPos(obj) {
    var arr = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        arr.push(obj[i].offsetLeft);
    }
    return arr;
}
//显示、隐藏按钮
function showBtn() {
    //左
    btnLeft.on('mouseenter', function() {
        window.clearInterval(headTimer);
        btnL.animate({ opacity: 1 }, 'swing');
    });
    btnLeft.on('mouseleave', function() {
        startTimer();
        btnL.animate({ opacity: 0 }, 'swing');
    });
    //右
    btnRight.on('mouseenter', function() {
        window.clearInterval(headTimer);
        btnR.animate({ opacity: 1 }, 'swing');
    });
    btnRight.on('mouseleave', function() {
        startTimer();
        btnR.animate({ opacity: 0 }, 'swing');
    });

    bindBtn();
}
//按钮绑定事件
function bindBtn() {
    btnL.on('click', function() {
        now--;
        change();
        smlPicChange();
    });
    btnR.on('click', function() {
        now++;
        change();
        smlPicChange();
    });
}
//开启定时器
function startTimer() {
    headTimer = window.setInterval(function() {
        now++;
        change();
        smlPicChange();
    }, 2000);
}