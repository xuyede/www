(function ($) {
    function SlideShow(options) {
        this.bar = options;
        this.image = [];
        this.init();
    }
    SlideShow.prototype.init = function () {
        //添加猫腻图
        this.createFakeImg();
        //创建Dom元素
        this.createDom();
        //获取操作Dom节点
        this.oUlPic = $('.pic-box', $(this.bar.body));
        this.aLiPic = $('.pic-box li', $(this.bar.body));
        this.oBtnl = $('.btn-left', $(this.bar.body));
        this.oBtnr = $('.btn-right', $(this.bar.body));
        this.aLiSml = $('.sml-pic li', $(this.bar.body));
        //获取图片位置数组
        this.PicPosArr = this.getPos($.makeArray(this.aLiPic));
        this.i = 1;
        this.timer = null; 
        this.len = this.aLiPic.length;
        //默认位置
        this.oUlPic.css('left', -this.PicPosArr[1]);
        this.startTimer();
        this.bindEvent();
    };
    SlideShow.prototype.createFakeImg = function () {
        var image = this.bar.image,
            len = image.length;

        this.image.push(image[len - 1]);
        for (var i = 0 ; i < len; i ++) {
            this.image.push(image[i]);
        }
        this.image.push(image[0]);
    }
    SlideShow.prototype.createDom = function () {
        var picBox = $('<ul class="pic-box"></ul>'),
            smlPic = $('<ul class="sml-pic"><ul>'),
            btn = $('<span class="btn btn-right"></span>');
        var picStr = '',
            smlStr = '',
            image = this.image,
            len = image.length;
        for (var i = 0; i < len; i++) {
            picStr += '<li><a href="javascript:void(false)"><img src="' + image[i] + '" alt=""></a></li>';
            if (i < len - 2) {
                smlStr += '<li></li>';
            }
        }
        
        $(this.bar.body)
            .css({
                'height': this.bar.height + 'px',
                'width' : this.bar.width + 'px'
            })
            .append(picBox.css('width', len * this.bar.width + 'px').html(picStr))
            .append(btn).append(smlPic.html(smlStr));
        picBox.find('li').css('width', this.bar.width + 'px');
        $('.sml-pic li').eq(0).addClass('active');
    };
    //绑定事件
    SlideShow.prototype.bindEvent = function () {
        var self = this;
        this.oBtnl && this.oBtnl.on('click', function () {
            self.i--;
            self.restart();
        });
        this.oBtnr && this.oBtnr.on('click', function () {
            self.i++;
            self.restart();
        });
        this.aLiSml.on('click', function () {
            self.i = $(this).index() + 1;
            self.restart();
        });
    };
    SlideShow.prototype.restart = function () {
        clearInterval(this.timer);
        this.change();
        this.startTimer();
    };
    //定时器
    SlideShow.prototype.startTimer = function () {
        var self = this;
        var intervalTime = this.bar.interval || 3000;
        this.timer = setInterval(function () {
            self.i++;
            self.change();
        }, intervalTime);
    };
    //图片运动
    SlideShow.prototype.change = function () {
        var self = this;
        var animateTime = this.bar.animateDuration || 400
        if (this.i > this.len - 1) {
            this.oUlPic.css('left', -this.PicPosArr[1]);
            this.i = 2;
        }
        if (this.i < 0) {
            this.oUlPic.css('left', -this.PicPosArr[this.len - 2]);
            this.i = this.len - 3;
        }
        this.showSml();
        this.oUlPic.stop().animate({
            'left': -self.PicPosArr[self.i]
        }, animateTime, 'linear');
    };
    //小点样式
    SlideShow.prototype.showSml = function () {
        var index = (this.i - 1) % (this.len - 2);
        $('.active').removeClass('active');
        this.aLiSml.eq(index).addClass('active');
    };
    //获取图片位置
    SlideShow.prototype.getPos = function (arr) {
        var arrPos = [],
            _arr = arr;
        for (var i = 0, len = arr.length; i < len; i++) {
            arrPos.push(_arr[i].offsetLeft);
        }
        return arrPos;
    };

    $.fn.extend({
        sliderImg: function (options) {
            var _options = options;
            _options.body = this || $('body');
            new SlideShow(_options);
        }
    });
}($));
