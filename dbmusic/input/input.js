(function ($) {
    window.DoJson = DoJson;
    function DoJson(data) {
        var dataArr = data.musics,
            len = dataArr.length,
            str = '';
            console.log(data);
        var oUl = $('<ul class="input-show"></ul>');
        if (len !== 0) {
            for (var i = 0; i < len; i++) {
                str += '<li>\
                            <a href="' + dataArr[i].mobile_link + '">\
                                <img src="' + dataArr[i].image + '" alt="">\
                                <span>\
                                    <p class="fir-txt">' + dataArr[i].title + '</p>\
                                    <p class="sec-txt">表演者:' + dataArr[i].author[0].name + '</p>\
                                </span>\
                            </a>\
                        </li>';
            }
            oUl.html(str);
            $('.sea-input').append(oUl);
        } else {
            $('.input-show').css('display', 'none');
        }
    }

    function Search(param) {
        this.param = param;
        this.init();
    }
    Search.prototype.init = function () {
        this.createDom();
        $('.input-box').on('input', this.deBounce(this.getRequest, 500));

        $('.search-btn').on('click', function () {
            var _val = $('.input-box').val();
            if (_val != '') {
                window.open('https://music.douban.com/subject_search?search_text=' + _val + '&cat=1003', '', '', '', '');
            }
        });
    };
    Search.prototype.deBounce = function (handle, delay) {
        var timer = null;
        var self = this;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                handle.call(self);
            }, delay);
        };
    };
    Search.prototype.getRequest = function () {
        var val = $('.input-box').val();
        var param = this.param;

        $.ajax({
            type: param.type,
            url: param.url,
            data: param.data + val + param.count,
            dataType: param.dataType,
            success: param.success 
        });
    };
    Search.prototype.createDom = function () {
        var oForm = $('<form></form>'),
            oDiv = $('<div class="sea-input"></div>'),
            oInp = $('<input type="text" class="input-box" placeholder=' + this.param.decoration + '>'),
            oBtn = $('<button class="search-btn"></button>');

        oDiv.append(oInp).append(oBtn);
        oForm.append(oDiv);
        $(this.param.body).append(oForm);
    };

    $.fn.extend({
        searchThing: function (param) {
            var _param = param;
            _param.body = this;
            new Search(_param);
        }
    });
}($));