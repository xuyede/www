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
    event.stop().animate({
        width: 400
    }, 400, 'linear').siblings().stop().animate({
        width: ot + 'px'
    }, 400, 'linear');
    event.find('.title').fadeOut('slow');
    event.siblings().find('.title').fadeIn('slow');
    event.find('.decoration').stop().animate({
        bottom: 0
    }, 400, 'swing');
    event.siblings().find('.decoration').stop().animate({
        bottom: -60
    }, 400, 'swing');
}