define(function (require, exports) {
    // 引入jq模块
    var $ = require('./jquery.js');

    function WaterFall() {
        this.num = 1;
        this.oLi = $('li');
        this.flag = true;
        this.getData();
        this.bindScroll(this.oLi);
    }
    WaterFall.prototype = {
        bindClick: function () {
            //图片预览
            $('.image-box').on('click', '.img', function () {
                var url = $(this).attr('src');
                var img = new Image();
                $(img).attr('src', url);
                //先清空再获取
                $('.show').html('').append(img).append($('<div class="close"></div>')).css('display', 'block');
            });

            $('.show').on('click', '.close', function () {
                $('.show').css('display', 'none');
            });
        },
        bindScroll: function (dom) {
            var self = this;
            $(window).scroll(function () {
                var scrollH = $(window).scrollTop(),
                    minLiH = dom.eq(self.getIndex(dom)).height(),
                    winH = $(window).height();
                
                //滚动条滑到第一屏底部加载（懒加载）
                if (scrollH + winH > minLiH) {
                    self.getData();
                }

            });
        },
        getData: function () {
            var self = this;
            if (this.flag) {
                this.flag = false;
                $.ajax({
                    type: 'GET',
                    url: '/getPics.php',
                    data: 'cpage=' + self.num,
                    beforeSend: function () {
                        $('.loading').css('display', 'block');
                    },
                    success: self.createDom.bind(self),

                });
                this.num++;
                //资源太少，循环使用
                if (this.num > 2) {
                    this.num = 1;
                }
            }
        },
        createDom: function (data) {
            var imgArr = JSON.parse(data);
            var len = imgArr.length;
            var self = this;
            var count = 0;
            console.log(imgArr);

            imgArr.forEach(function (ele, index) {
                var oImgBox = $('<div class="image-box"></div>'),
                    oImg = $('<div class="image"></div>'),
                    oP = $('<p>title</p>'),
                    img = new Image();

                $(img).attr('src', ele.image).attr('class', 'img');
                //排除异常图片资源
                $(img).on('error', function () {
                    len--;
                    if (count === len) {
                        console.log('over');
                        self.bindClick();
                    }
                });
                $(img).on('load', function () {
                    count++;
                    oImg.append(img);
                    oImgBox.append(oImg).append(oP);
                    self.oLi.eq(self.getIndex(self.oLi)).append(oImgBox);
                });

            });
            this.flag = true;
        },
        getIndex: function (dom) {
            var index = dom.eq(0).index(),
                len = this.oLi.length;

            // 选择排序
            for (var i = 1; i < len; i++) {
                if (dom.eq(i).height() < dom.eq(index).height()) {
                    index = i;
                }
            }

            return index;
        }
    };

    exports.WaterFall = WaterFall;
});