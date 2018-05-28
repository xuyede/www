var oUl = $('ul'),
    aLi = $('li'),
    len = aLi.length,
    width = parseInt(oUl.css('width')),
    ot = Math.floor((width - 400) / (len - 1));

function init() {
    move(aLi.eq(len - 1));
}
init();

function bindEvent() {
    oUl.on('mouseenter', 'li', function() {
        move($(this));
    });
    oUl.on('mouseleave', function() {
        init();
    });
}
bindEvent();

function move(event) {
    event.siblings().stop().animate({
        width: ot + 'px'
    }, 500, 'swing');
    event.stop().animate({
        width: 400
    }, 500, 'swing');
    event.find('.title').fadeOut('fast');
    event.siblings().find('.title').fadeIn('fast');
    event.find('.decoration').stop().animate({
        bottom: 0
    }, 400, 'swing');
    event.siblings().find('.decoration').stop().animate({
        bottom: -60
    }, 400, 'swing');
}