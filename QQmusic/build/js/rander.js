(function (window, $) {
    function Rander () {
        console.log('rander func');

        this.$img = null;
        this.$songName = null;
        this.$singer = null;
        this.$album = null;
        this.$songEnd = null;
        this.firstBindEvent = true;
        this.target = null;
    }

    Rander.prototype.init = function () {
        this.$img = $('.img');
        this.$songName = $('.song-name');
        this.$singer = $('.singer');
        this.$album = $('.album');
        this.$songEnd = $('.song-end');

        this.target = main.arr[main.count];
        // 信息
        this.$img.css('background-image', 'url(' + this.target.image + ')');
        // 高斯模糊
        var img = new Image();
        img.src = this.target.image;
        img.onload = function () {
            window.blurImg(img, $(document.body));
        };

        this.$songName.html(this.target.song);
        this.$singer.html(this.target.singer);
        this.$album.html(this.target.album);
        // 总时间
        this.duration = this.target.duration;
        var minute = '0' + Math.floor((this.duration / 60));
        var seconds = this.duration % 60;
        this.$songEnd.html(minute + ':' + seconds);

        main.audio.src = this.target.audio;

        // 根据动态数据显示爱心
        if (this.target.isLike) {
            main.$isLike.css('background-image', 'url("../images/icon-like-solid.png")');
        } else {
            main.$isLike.css('background-image', 'url("../images/icon-like.png")');
        }
        // 只第一次执行
        if (this.firstBindEvent) {
            this.firstBindEvent = false;
            main.menu.createDom();
            main.bindEvent.bindClick();
        }
        
        // 解绑后执行
        if (main.songListSign) {
            $('li', main.menu.$songList).eq(main.count).find('span').css('color', 'rgb(234,32,0)')
                .end().siblings().find('span').css('color', '#333');
        }
    };

    window.Rander = Rander;
} (window, jQuery));