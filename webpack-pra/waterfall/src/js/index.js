define(function (require) {
    // 引入less模块
    require('../css/index.less');

    // 引入js模块
    var tools = require('./waterFall.js');
    new tools.WaterFall();
});