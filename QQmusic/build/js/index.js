(function (window, $) {
    function Main() {
        console.log('main func');

        // 实例化
        this.rander = new Rander();
        this.bindEvent = new BindEvent();
        this.bindBar = new BindBar();
        this.dragBar = new DragBar();
        this.menu = new Menu();
        // 渲染
        this.$isLike = $('.like');
        // 进度点拖拽锁
        this.flag = true; 
        // 菜单点击锁
        this.songListSign = false;
        // 进度条属性
        this.duration = null;
        this.curTime = null;
        this.barWidth = null;
        this.dragEnd = null;
        this.barWidth = null;
        // 共用属性
        this.audio = new Audio();
        this.arr = null;
        this.count = 0;
        this.getData();
    }
    // 获取数据
    Main.prototype.getData = function () {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '../songImf/data.json',
            success: function (data) {
                self.arr = data;
                self.rander.init();
            }
        });
    };
    Main.prototype.rePlay = function () {
        this.rander.init();
        this.audio.autoplay = true;
        this.bindBar.autoBar();
        this.bindEvent.$play.css('background-image', 'url("../images/icon-pause.png")');
    };

    window.Main = Main;
}(window, jQuery));