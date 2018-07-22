(function (window, $) {
    function DragBar() {
        console.log('DragBar func');
    }

    DragBar.prototype.dragMove = function (posX) {
        var newCurTime = null,
            x = posX;
        // 根据拖动距离转化成时间
        newCurTime = ((x + 7) * main.duration) / main.barWidth;

        var minute = Math.floor(newCurTime / 60),
            seconds = Math.floor(newCurTime % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        main.bindBar.$songStart.html('0' + minute + ':' + seconds);
        main.bindBar.$bar.css('width', x + 'px');
        main.bindBar.$barCircle.css('left', x - 7 + 'px');

        return newCurTime;
    };

    window.DragBar = DragBar;
}(window, jQuery));