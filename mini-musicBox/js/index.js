(function (window, $) {

    window.PlayMusic = PlayMusic;

    function PlayMusic() {
        this.audio = document.createElement('audio');
        this.timeLen = $('.player_musicTime').get(0).offsetWidth;
        this.init();
    }
    PlayMusic.prototype.init = function () {
        this.audio.setAttribute('src', $('.song_active').attr('data-origin'));
        this.bindEvent();
    };
    PlayMusic.prototype.bindEvent = function () {
        var self = this;
        $('.player_play').on('click', function () {

            if ($('.player_nva').hasClass('play')) {
                $('.player_nva .player_cd div').css({
                    'animation-play-state': 'paused'
                });
                $('.player_nva').removeClass('play');
                $('.player_songInf').css({
                    top: '0%',
                    transition: '0.2s'
                });
                self.audio.pause();
                self.musicTime();
            } else {
                self.changeMusic();
            }
        });
        $('.player_prev').on('click', function () {
            if ($('.song_active').is($('.player_nva .player_cd > :first-child'))) {
                $('.song_active').removeClass('song_active');
                $('.player_nva .player_cd > :last-child').addClass('song_active');
                self.changeSong();
            } else {
                $('.song_active').removeClass('song_active').prev().addClass('song_active');
                self.changeSong();
            }
        });
        $('.player_next').on('click', function () {
            if ($('.song_active').is($('.player_nva .player_cd > :last-child'))) {
                $('.song_active').removeClass('song_active');
                $('.player_nva .player_cd > :first-child').addClass('song_active');
                self.changeSong();
            } else {
                $('.song_active').removeClass('song_active').next().addClass('song_active');
                self.changeSong();
            }
        });
    };
    PlayMusic.prototype.changeSong = function () {
        this.audio.setAttribute('src', $('.song_active').attr('data-origin'));
        this.changeMusic();
    };
    PlayMusic.prototype.changeMusic = function () {
        $('.player_nva').addClass('play');
        $('.player_nva .player_cd div').css({
            animation: 'move 10s infinite linear'
        });
        $('.player_songInf').css({
            top: '-50%',
            transition: '0.2s'
        });
        $('.player_songInf > :first-child').html($('.song_active').attr('data-song'));
        $('.player_songInf > :last-child').html($('.song_active').attr('data-author'));
        this.audio.play();
        this.musicTime();
    };
    PlayMusic.prototype.musicTime = function () {
        var self = this;
        this.audio.addEventListener('timeupdate', function () {
            var duration = this.duration,
                curTime = this.currentTime,
                time = curTime / duration;

            $('.player_time').css({
                'width': parseInt(time * self.timeLen) + 'px'
            });
        });
    };
}(window, $));