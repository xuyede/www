define(function (require) {
    // 引入css模块
    require('../css/index.css');

    var oBox = document.getElementsByClassName('box')[0],
        oBar = document.getElementsByClassName('bar')[0],
        oPercentNum = document.getElementsByClassName('percent-num')[0],
        oClose = document.getElementsByClassName('close')[0],
        totalWidth = document.getElementsByClassName('progress-bar')[0].offsetWidth;

    var events = {
        load: function () {

        },
        propress: function (percent) {
            oBar.style.width = Math.round(percent / 100 * totalWidth) + 'px';
            oPercentNum.innerHTML = percent + '%';
        },
        success: function () {
            console.log('file upload success');
        }
    };

    function bindEvent() {
        var reader,
            //引入loadFile模块
            loadfile = require('./loadFile.js');
        oBox.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, false);
        oBox.addEventListener('drop', function (e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            reader = new loadfile.LoadFile(events, file);
        }, false);
        oClose.addEventListener('click', function () {
            reader.onabort();
        }, false);
    }
    bindEvent();
});