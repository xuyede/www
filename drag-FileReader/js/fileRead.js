(function (window) {
    window.UploadFile = UploadFile;
    function UploadFile(file, events) {
        this.reader = new FileReader();
        this.file = file;
        this.events = events || {};
        this.total = file.size; //文件总大小
        this.step = 1024 * 1024; //分步上传大小
        this.loaded = 0; //已经上传的数据大小

        //初始化上传
        this.upload(0);
        this.bindEvent();
    }
    UploadFile.prototype = {
        bindEvent: function () {
            var self = this,
                reader = this.reader;
            //监听上传完成
            reader.addEventListener('load', function () {
                self.onLoad();
            }, false);
            //监听上传中
            reader.addEventListener('progress', function (e) {
                self.onProgress(e.loaded);
            }, false);
        },
        //文件上传文成
        onLoad: function () {
            var handler = this.events.load;
            //每成功一次就ajax发送一次
            handler && handler(this.reader.result);

            if (this.loaded < this.total) {
                //未全部上传完成
                this.upload(this.loaded);
            } else {
                //全部上传完成
                this.events.success();
            }
        },
        //文件上传中
        onProgress: function (loaded) {
            var handler = this.events.progress,
                percent;

            this.loaded += loaded;
            percent = (this.loaded / this.total) * 100;
            handler && handler(percent);
        },
        //上传文件
        upload: function (start) {
            var file = this.file,
                readyFile;

            //如果有slice方法就分步上传，没有就整体上传
            if (file.slice) {
                readyFile = file.slice(start, start + this.step);
            } else {
                readyFile = file;
            }

            this.reader.readAsText(readyFile);
        },
        //终止上传文件
        abort: function () {
            var reader = this.reader;

            if (reader.abort) {
                reader.abort();
            }
        }
    };
}(window))