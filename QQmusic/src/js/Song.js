(function (window, $) {
    function Song() {
        console.log('this is song func');
        // init
        this.$img = null;
        this.$songName = null;
        this.$singer = null;
        this.$album = null;
        this.firstBindEvent = true;

        this.$songEnd = null;
        this.$songList = null;
        this.count = 0;
        this.arr = null;
        this.audio = new Audio();
        
        this.songListSign = false;
        // bindEvent
        this.$isLike = $('.like');
        this.$play = null;
        this.$next = null;
        this.$list = null;
        this.$menu = null;
        this.$pre = null;
        
        this.$barBox = null;
        this.$songStart = null;
        this.$bar = null;
        this.$barCircle = null;
        
        this.flag = true;
        this.duration = null;
        this.curTime = null;
        this.barWidth = null;
        this.dragEnd = null;

        this.getData();
    }

    Song.prototype.bindEvent = function () {
        var self = this;
        var target = this.arr[this.count];

        this.$play = $('.play');
        this.$barBox = $('.bar-box');
        this.$songStart = $('.song-start');
        this.$bar = $('.bar');
        this.$barCircle = $('.bar-circle');
        this.$next = $('.next');
        this.$pre = $('.pre');
        this.$list = $('.list');
        this.$menu = $('.menu');

        // 爱心
        this.$isLike.on('click', function () {
            target.isLike = target.isLike ? false : true;
            if (target.isLike) {
                $(this).css('background-image', 'url("../images/icon-like-solid.png")');
            } else {
                $(this).css('background-image', 'url("../images/icon-like.png")');
            }
        });
        // 播放、暂停
        this.$play.on('click', function () {
            if (self.audio.paused) {
                self.audio.play();
                self.barEvent();
                $(this).css('background-image', 'url("../images/icon-pause.png")');
            } else {
                self.audio.pause();
                $(this).css('background-image', 'url("../images/icon-play.png")');
            }
        });
        // 拖动进度点
        this.barWidth = this.$barBox.innerWidth();
        this.$barCircle.on('touchstart', function (e) {
            // 拖动时绑定播放监听
            self.flag = false;
            var x = e.changedTouches[0].clientX;
            self.eleLeft = $(this).position().left;
            self.disX = x - self.eleLeft;
        }).on('touchmove', function (e) {
            var x = e.changedTouches[0].clientX;
            var posX = self.posX = x - self.disX;
            // 限制进度点拖动范围
            if (posX < 0) {
                posX = 0;
            } else if (posX > self.barWidth - 15) {
                posX = self.barWidth - 15;
            }
            $(this).css('left', posX + 'px');
            self.dragEnd = self.dragBar(posX);
        }).on('touchend', function () {
            $(this).css('left', self.posX + 'px');
            // 松开时更新播放时间
            self.audio.currentTime = self.dragEnd;
            // 解绑播放监听
            self.flag = true;
        });
        // 下一首
        this.$next.on('click', function () {
            self.count++;
            if (self.count > self.arr.length - 1) {
                self.count = 0;
            }
            self.rePlay();
        });
        // 上一首
        this.$pre.on('click', function () {
            self.count--;
            if (self.count < 0) {
                self.count = self.arr.length - 1;
            }
            self.rePlay();
        });
        // 菜单
        this.$list.on('click', function (e) {
            e.stopPropagation();
            self.songListSign = true;
            self.$menu.append(self.$songList);
            self.$menu.fadeIn(400);
            $('li', self.$songList).eq(self.count).find('span').css('color', 'rgb(234,32,0)');
        });
        // 菜单点击
        this.$songList.on('click', 'li', function (e) {
            e.stopPropagation();
            self.count = $(this).index();
            self.rePlay();
        }).on('click', function (e) {
            e.stopPropagation();
        });
        $(document).on('click', function (e) {
            self.$menu.fadeOut(400);
        });
    };

    Song.prototype.dragBar = function (posX) {
        var newCurTime = null,
            x = posX;
        // 根据拖动距离转化成时间
        newCurTime = ((x + 7) * this.duration) / this.barWidth;

        var minute = Math.floor(newCurTime / 60),
            seconds = Math.floor(newCurTime % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        this.$songStart.html('0' + minute + ':' + seconds);
        this.$bar.css('width', x + 'px');
        this.$barCircle.css('left', x - 7 + 'px');

        return newCurTime;
    };

    Song.prototype.rePlay = function () {
        this.init();
        this.audio.autoplay = true;
        this.barEvent();
        this.$play.css('background-image', 'url("../images/icon-pause.png")');
    };

    Song.prototype.barEvent = function () {
        var self = this;
        // 歌曲播放监听
        this.audio.addEventListener('timeupdate', function () {
            // 开始拖拽进度点时上锁，松开后解锁
            if (self.flag) {
                self.duration = this.duration;
                self.curTime = this.currentTime;
                // 自动播放下一曲
                if (self.duration === self.curTime) {
                    self.count++;
                    if (self.count > self.arr.length - 1) {
                        self.count = 0;
                    }
                    self.rePlay();
                }
                // 时间，进度点更新
                var time = self.curTime / self.duration;
                var minute = Math.floor(self.curTime / 60),
                    seconds = Math.floor(self.curTime % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                self.$songStart.html('0' + minute + ':' + seconds);

                self.$bar.css('width', Math.floor(time * self.barWidth) + 'px');
                self.$barCircle.css('left', Math.floor(time * self.barWidth) - 7 + 'px');
            }
        }, false);

    };

    Song.prototype.init = function () {
        this.$img = $('.img');
        this.$songName = $('.song-name');
        this.$singer = $('.singer');
        this.$album = $('.album');
        this.$songEnd = $('.song-end');

        var target = this.arr[this.count];
        // 信息
        this.$img.css('background-image', 'url(' + target.image + ')');
        this.$songName.html(target.song);
        this.$singer.html(target.singer);
        this.$album.html(target.album);
        // 总时间
        this.duration = target.duration;
        var minute = '0' + Math.floor((this.duration / 60));
        var seconds = this.duration % 60;
        this.$songEnd.html(minute + ':' + seconds);

        this.audio.src = target.audio;
        // 根据动态数据显示爱心
        if (target.isLike) {
            this.$isLike.css('background-image', 'url("../images/icon-like-solid.png")');
        } else {
            this.$isLike.css('background-image', 'url("../images/icon-like.png")');
        }
        // 只第一次执行
        if (this.firstBindEvent) {
            this.firstBindEvent = false;
            this.createDom();
            this.bindEvent();
        }
        // 解绑后执行
        if (this.songListSign) {
            $('li', this.$songList).eq(this.count).find('span').css('color', 'rgb(234,32,0)')
                .end().siblings().find('span').css('color', '#333');
        }
    };

    Song.prototype.createDom = function () {
        // <ul class="song-list">
        //     <li>
        //         <span class="txt-name">丑八怪</span>
        //         <span class="txt-singer">- 薛之谦</span>
        //     </li>
        // </ul>

        this.$songList = $('<ul class="song-list"></ul>');

        var target = this.arr,
            len = target.length,
            str = '';

        for (var i = 0; i < len; i++) {
            str += '<li>\
                     <span class="txt-name">' + target[i].song + '</span>\
                     <span class="txt-singer">' + '- ' + target[i].singer + '</span>\
                 </li>';
        }
        this.$songList.html(str);
    };

    Song.prototype.getData = function () {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '../songImf/data.json',
            success: function (data) {
                self.arr = data;
                self.init();
            }
        });
    };

    window.Song = Song;
}(window, jQuery));