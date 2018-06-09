var wrapper = $('.wrapper');

setTimeout(function () {
    $('.wrapper').removeClass('init');
}, 200);

$('.item').on('click', function() {
    wrapper.addClass('wrapper-click');
    $(this).addClass('active');
})

$('.close').on('click', function(e) {
    e.stopPropagation();
    $('.active').removeClass('active');
    wrapper.removeClass('wrapper-click');
})