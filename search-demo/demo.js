'use strict';
var personArr = [{
    name: '张三',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2975441730,403112496&fm=27&gp=0.jpg',
    description: '哪都有他',
    sex: 'male'
}, {
    name: '张三丰',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=323900995,3218484462&fm=27&gp=0.jpg',
    description: '公园小王子',
    sex: 'male'
}, {
    name: '李丽丽',
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1223534524,380295550&fm=27&gp=0.jpg',
    description: '颈椎有病',
    sex: 'female'
}, {
    name: '李秋桐',
    url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4013303167,1251626329&fm=27&gp=0.jpg',
    description: '我爱你是真的',
    sex: 'male'
}, {
    name: '渣渣辉',
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2933192334,570785402&fm=27&gp=0.jpg',
    description: '标准普通话',
    sex: 'male'
}];

var oSex = document.getElementsByClassName('sex-box')[0],
    oInput = document.getElementsByClassName('find')[0],
    oUl = document.getElementsByClassName('item-List')[0];


start();

function start() {
    init(personArr);
    bindEvent();
}

function init(arr) {
    var _arr = arr,
        str = '';

    _arr.forEach(function(ele) {
        str += '<li>\
                    <img src="' + ele.url + '" class="pic">\
                    <p>' + ele.name + '</p>\
                    <span>' + ele.description + '</span>\
                </li>';
    });
    oUl.innerHTML = str;
}

function bindEvent() {
    oInput.oninput = deBounce(filterByInput, 1000);
    oSex.addEventListener('click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.tagName === 'SPAN') {
            document.getElementsByClassName('active')[0].className = 'sex';
            target.className = 'sex active';
            // sign._sex = target.innerText;
            dealWith.setHandle(filter);
            // dealWith.setSign({_sex : target.innerText});
            // init(filter(doubleFilter, personArr));
            init(dealWith.setSign({_sex : target.innerText}));
        
        }
    }, false);
}

function filterByInput() {
    // sign._name = this.value;
    var val = this.value;
    dealWith.setHandle(filter);
    // dealWith.setSign({_name : val});
    // init(filter(doubleFilter, personArr));
    init(dealWith.setSign({_name : val}));
}

function deBounce(handle, delay) {
    var timer = null;
    return function() {
        var self = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            handle.call(self);
        }, delay);
    };
}

function filterBySex(sex, arr) {
    var _sex = sex,
        _arr = arr,
        newArr = [];

    if (_sex === 'all') {
        return _arr;
    } else {
        newArr = _arr.filter(function(ele) {
            return ele.sex === _sex ? true : false;
        });
        return newArr;
    }
}

function filterByName(name, arr) {
    var _name = name,
        _arr = arr,
        newArr = [];

    newArr = _arr.filter(function(ele) {
        return ele.name.indexOf(_name) !== -1 ? true : false;
    });
    return newArr;
}

var doubleFilter = {
    _name: filterByName,
    _sex: filterBySex
}

function filter(obj, arr) {
    var _arr = arr,
        _obj = obj;

    for (var k in _obj) {
        // _arr = obj[k](sign[k], _arr);
        _arr = obj[k](dealWith.getSign()[k], _arr);
    }
    return _arr;
}

function deal(firstsign) {
    var arr = [],
        sign = firstsign;

    function getSign() {
        return sign;
    }

    function setSign(obj) {
        var newArr = [];
        for (var prop in obj) {
            sign[prop] = obj[prop];
            
        }
        //watch this
        arr.forEach(function(ele) {
            newArr = ele(doubleFilter, personArr);
        });
        return newArr;
    }

    function setHandle(handle) {
        arr.push(handle);
    }

    return {
        getSign: getSign,
        setSign: setSign,
        setHandle: setHandle
    };
}

var dealWith = deal({
    _name : '',
    _sex : 'all'
});