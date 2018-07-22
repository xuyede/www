define(function (require, exports) {
    function LoadFile (events, file) {
        this.reader = new FileReader();
        this.events = events;
        this.file = file;
        this.totalSize = file.size;
        this.loadedSize = 0;
        this.step = 1024 * 1024;

        this.uploadFile(0);
        this.bindEvent();

    }
    LoadFile.prototype = {
        bindEvent : function () {
            var reader = this.reader,
                self = this;

            reader.addEventListener('load', function () {
                self.onLoad();
            }, false);
            reader.addEventListener('progress', function (e) {
                self.onProgress(e.loaded);
            }, false);
        },
        onLoad : function () {
            var handler = this.events.load || 
                function () {
                    console.log('do not found func of load');
                };
            
            handler(this.reader.result);

            if (this.loadedSize < this.totalSize) {
                this.uploadFile(this.loadedSize);
            } else {
                this.events.success();
            }
        },
        onProgress : function (loaded) {
            var handler = this.events.propress || 
                function () {
                    console.log('do not found func of progress');
                },
                percent;

            this.loadedSize += loaded;
            percent = Math.round(this.loadedSize / this.totalSize * 100);
            handler(percent);
        },
        //读取文件
        uploadFile : function (start) {
            var file = this.file,
                _file;

            if (file.slice) {
                _file = file.slice(start, start + this.step);
            } else {    
                _file = file;
            }

            this.reader.readAsText(_file);
        },
        onabort : function () {
            var reader = this.reader;

            if (reader) {
                reader.abort();
                console.log('cancel upload file, drag the file in box to start upload again');
            }
        }
    };
    exports.LoadFile = LoadFile;
});