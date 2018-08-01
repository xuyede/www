(function ($) {
    function Slide(param) {
        this.body = param.body;
        this.param = param;
        this.timer = null;
        this.count = 1;
        this.len = this.param.image.length;
        this.init();
    }
    Slide.prototype = {
        init: function () {
            var self = this,
                image = this.param.image,
                doneNum = 0;
            for (let i = 0; i < this.len; i++) {
                var img = new Image();
                img.src = image[i];
                img.onload = function () {
                    self.body.append(this);
                    doneNum++;

                    if (doneNum === self.len) {
                        for (let i = 0; i < self.len; i++) {
                            $('img', $(self.body))
                                .eq(i)
                                .css('transition', 'all ' + self.param.animateTime / 1000 + 's')
                                .addClass('img' + i);
                        }
                    }
                };
            }
            this.bindEvent();
            if (this.param.autoplay) {
                this.autoSlide();
            }
        },
        bindEvent: function () {
            var self = this;
            this.body.on('click', 'img', function () {
                var index = Number($(this).attr('class').split('img')[1]),
                    disL = Math.floor(self.len / 2) - index;

                for (let i = 0; i < self.len; i++) {
                    // 当前的class名
                    var nowIndex = Number($('img', $(self.body)).eq(i).attr('class').split('img')[1]);
                    var pos = nowIndex + disL;
                    if (pos < 0) {
                        pos = self.len + pos;
                    } else if (pos > self.len - 1) {
                        pos = pos - self.len;
                    }
                    $('img', $(self.body)).eq(i).removeClass().addClass('img' + (pos));
                }
            });
        },
        autoSlide: function () {
            var self = this;
            this.startInterval();
            $(this.body).hover(function () {
                clearInterval(self.timer);
            }, function () {
                self.startInterval();
            });
        },
        startInterval: function () {
            var self = this;
            this.timer = setInterval(function () {
                self.autoMove();
            }, this.param.interval);
        },
        autoMove: function () {
            for (let i = 0; i < this.len; i++) {
                var nowIndex = Number($('img', $(this.body)).eq(i).attr('class').split('img')[1]);
                var pos = nowIndex + this.count;
                if (pos > this.len - 1) {
                    pos = pos - this.len;
                }
                $('img', $(this.body)).eq(i).removeClass().addClass('img' + (pos));
            }
        }
    };

    $.fn.extend({
        slide: function (param) {
            var _param = param || {};
            _param.body = $(this) || $(document.body);

            new Slide(_param);
        }
    });
}(jQuery));