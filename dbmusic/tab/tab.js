(function ($) {

    function Tab(param) {
        this.param = param;
        this.body = param.body;
        this.init();
    }
    Tab.prototype.init = function () {
        this.createDom();
        if (this.param.hover) {
            this.hover();
        }
        this.bindEvent();
    };
    Tab.prototype.createDom = function () {
        // 生成标题，如果有的话
        var title = this.param.title,
            m_title = '';
        if (title !== '') {
            m_title = '<span class="m-title">' + title + '</span>';
        }
        // 选项卡标题
        var titleArr = this.param.titleList,
            titleStr = m_title,
            titleBody = $('<div class="musican-title"></div>');

        for (var i = 0, titleLen = titleArr.length; i < titleLen; i++) {
            titleStr += '<a href="javascript:void(false)" class="musican-' + (i + 1) + '">' + titleArr[i] + '</a>';
        }
        titleBody.html(titleStr);
        // 选项卡内容
        var contentArr = this.param.contentList,
            contentBody = $('<div class="musican-content"></div>');

        for (var j = 0, contentLen = contentArr.length; j < contentLen; j++) {
            contentBody.append(contentArr[j]);
        }
        // 插入
        this.body.append(titleBody).append(contentBody);
        $('.musican-title a').eq(0).addClass('click-music');
        $('.m-title').css({
            'font-size' : '17px',
            'color' : '#333',
            'margin-right' : '10px'
        });
    };
    Tab.prototype.hover = function () {
        $('.musican-dec').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
    };
    Tab.prototype.bindEvent = function () {
        $('.musican-title').on('click', 'a', function () {
            if ($(this).hasClass('musican-1')) {
                $(this).addClass('click-music').siblings().removeClass('click-music');
                $('.week-show').css('display', 'block');
                $('.fast-show').css('display', 'none');
            } else {
                $(this).addClass('click-music').siblings().removeClass('click-music');
                $('.week-show').css('display', 'none');
                $('.fast-show').css('display', 'block');
            }
        });
    };


    $.fn.extend({
        tab: function (param) {
            var _param = param;
            _param.body = this || $('body');
            new Tab(_param);
        }
    });
})($);