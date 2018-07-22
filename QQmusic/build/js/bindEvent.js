(function (window, $) {
    function BindEvent() {
        console.log('bindEvent func');

        this.$play = null;
        this.$next = null;
        this.$list = null;
        this.$pre = null;
        this.$list = null;
        this.$menu = null;

    }

    BindEvent.prototype.bindClick = function () {
        var self = this;
        // var target = main.arr[main.count];

        this.$play = $('.play');
        this.$next = $('.next');
        this.$pre = $('.pre');
        this.$list = $('.list');
        this.$menu = $('.menu');

        // 爱心
        main.$isLike.on('click', function () {
            main.rander.target.isLike = main.rander.target.isLike ? false : true;
            if (main.rander.target.isLike) {
                $(this).css('background-image', 'url("../images/icon-like-solid.png")');
            } else {
                $(this).css('background-image', 'url("../images/icon-like.png")');
            }
        });
        // 播放、暂停
        this.$play.on('click', function () {
            if (main.audio.paused) {
                main.audio.play();
                main.bindBar.autoBar();
                $(this).css('background-image', 'url("../images/icon-pause.png")');
            } else {
                main.audio.pause();
                $(this).css('background-image', 'url("../images/icon-play.png")');
            }
            
        });
        // 下一首
        this.$next.on('click', function () {
            main.count++;
            if (main.count > main.arr.length - 1) {
                main.count = 0;
            }
            main.rePlay();
        });
        // 上一首
        this.$pre.on('click', function () {
            main.count--;
            if (main.count < 0) {
                main.count = main.arr.length - 1;
            }
            main.rePlay();
        });
        // 进度点拖动
        main.bindBar.drag.call(main.bindBar);
        // 菜单列表
        this.$list.on('click', function (e) {
            e.stopPropagation();
            main.songListSign = true;
            self.$menu.append(main.menu.$songList);
            self.$menu.fadeIn(400);
            $('li', main.menu.$songList).eq(main.count).find('span').css('color', 'rgb(234,32,0)');
        });
        main.menu.$songList.on('click', 'li', function (e) {
            e.stopPropagation();
            main.count = $(this).index();
            main.rePlay();
        }).on('click', function (e) {
            e.stopPropagation();
        });
        $(document).on('click', function (e) {
            self.$menu.fadeOut(400);
        });
    };

    window.BindEvent = BindEvent;
}(window, jQuery));