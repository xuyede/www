(function (window, $) {
    function BindBar() {
        console.log('bindBar func');

        this.$songStart = $('.song-start');
        this.$bar = $('.bar');
        this.$barCircle = $('.bar-circle');
        this.$barBox = $('.bar-box');
    }

    BindBar.prototype.autoBar = function () {
        var self = this;
        main.barWidth = this.$barBox.innerWidth();
        main.audio.addEventListener('timeupdate', function () {
            // 开始拖拽进度点时上锁，松开后解锁
            if (main.flag) {
                main.duration = this.duration;
                main.curTime = this.currentTime;
                // 自动播放下一曲
                if (main.duration === main.curTime) {
                    main.count++;
                    if (main.count > main.arr.length - 1) {
                        main.count = 0;
                    }
                    main.rePlay();
                }
                // 时间，进度点更新
                var time = main.curTime / main.duration;
                var minute = Math.floor(main.curTime / 60),
                    seconds = Math.floor(main.curTime % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                self.$songStart.html('0' + minute + ':' + seconds);

                self.$bar.css('width', Math.floor(time * main.barWidth) + 'px');
                self.$barCircle.css('left', Math.floor(time * main.barWidth) - 7 + 'px');
            }
        }, false);
    };

    BindBar.prototype.drag = function () {
        var self = this;
        this.$barCircle.on('touchstart', function (e) {
            // 拖动时绑定播放监听
            main.flag = false;
            var x = e.changedTouches[0].clientX;
            self.eleLeft = $(this).position().left;
            self.disX = x - self.eleLeft;
        }).on('touchmove', function (e) {
            var x = e.changedTouches[0].clientX;
            var posX = self.posX = x - self.disX;
            // 限制进度点拖动范围
            if (posX < 0) {
                posX = 0;
            } else if (posX > main.barWidth - 15) {
                posX = main.barWidth - 15;
            }
            $(this).css('left', posX + 'px');
            self.dragEnd = main.dragBar.dragMove(posX);
        }).on('touchend', function () {
            $(this).css('left', self.posX + 'px');
            // 松开时更新播放时间
            main.audio.currentTime = self.dragEnd;
            // 解绑播放监听
            main.flag = true;
        });
        
    };

    window.BindBar = BindBar;
}(window, jQuery));