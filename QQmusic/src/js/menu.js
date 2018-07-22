(function (window, $) {
    function Menu () {
        console.log('Menu func');
    }

    Menu.prototype.createDom = function () {
        // <ul class="song-list">
        //     <li>
        //         <span class="txt-name">丑八怪</span>
        //         <span class="txt-singer">- 薛之谦</span>
        //     </li>
        // </ul>

        this.$songList = $('<ul class="song-list"></ul>');

        var target = main.arr,
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

    window.Menu = Menu;
} (window, jQuery));