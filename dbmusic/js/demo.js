//轮播图插件
$('#slide-show').sliderImg({
    image: [
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2690.jpg',
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2700.jpg',
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2705.jpg',
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2711.jpg',
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2712.jpg',
    ],
    width : 675,
    height : 250,
    animateDuration : 400,
    interval : 3000
});

// 搜索框插件
$('#search').searchThing({
    decoration: '唱片名、表演者、条码、ISRC',
    type: 'GET',
    url: 'https://api.douban.com/v2/music/search',
    data: 'q=',
    count: '&count=7',
    dataType: 'jsonp',
    success: doJSON
});

function doJSON(data) {
    new DoJson(data);
}

// 流行音乐人板块
var contentArr = [];
var fastMusican = [
    {
        img: 'https://img1.doubanio.com/view/site/large/public/901fbfef74e72b8.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img1.doubanio.com/view/site/large/public/fa6401f24691aa7.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/322c03e03ee1260.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/0e73b36c78226a4.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/4c46dd8ed229b34.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img1.doubanio.com/view/site/large/public/bbd9cceb8bcf598.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/40f2f5412fe6cd0.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/e819cccd372d31e.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
];
var weekMusican = [
    {
        img: 'https://img1.doubanio.com/view/site/large/public/1e08cc8c1cc39f7.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/5b1acdbe26ef174.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/6626b4f2435a3ff.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/93bcbb3f5edde61.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/f71e53d0e861b40.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/723192105dc4422.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/d7773cc62f20ab3.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
    {
        img: 'https://img3.doubanio.com/view/site/large/public/94df98145146d05.jpg',
        name: 'P.K.14',
        class: '123',
        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
    },
];
function createDom(body, conStr, arr) {
    var len = arr.length;

    for (var i = 0; i < len; i++) {
        conStr += '<li>\
                        <a href="javascript:void(false)">\
                            <div class="musican-pic">\
                                <img src="' + arr[i].img + '" alt="">\
                            </div>\
                            <div class="musican-dec"> \
                                <div>\
                                    <p>' + arr[i].decoration[0] + '</p>\
                                    <p>' + arr[i].decoration[1] + '</p>\
                                    <p>' + arr[i].decoration[2] + '</p>\
                                    <p>' + arr[i].decoration[3] + '</p>\
                                </div>\
                                <span></span> \
                            </div> \
                        </a> \
                        <a href="javascript:void(false)">\
                            ' + arr[i].name + '\
                        </a> \
                        <p>' + arr[i].class + '</p> \
                    </li> '
    }
    body.html(conStr);
    return body;
}
var fastShow = createDom($('<ul class="fast-show"></ul>'), '', fastMusican);
var weekShow = createDom($('<ul class="week-show"></ul>'), '', weekMusican);
contentArr.push(weekShow);
contentArr.push(fastShow);
//选项卡插件
$('#music-tab').tab({
    titleList: ['本周流行音乐人', '上升最快音乐人'],
    contentList: contentArr,
    title: '',
    hover: true
});