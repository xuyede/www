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

var aSpan = document.getElementsByClassName('sex'),
    input = document.getElementsByClassName('find')[0],
    oUl = document.getElementsByClassName('item-List')[0],
    timer = null,
    hTimer = null;

aSpan[2].className = 'sex active';
org.addEvent(aSpan[0], 'click', function() {
    change(this);
    var result = filterSex('male');
    filterTarget(result);

});

org.addEvent(aSpan[1], 'click', function() {
    change(this);
    var result = filterSex('female');
    filterTarget(result);
});

org.addEvent(aSpan[2], 'click', function() {
    change(this);
    init();
});

function change(self) {
    input.value = '';
    clearAll();
    clearClass();
    self.className = 'sex active';
}

function clearClass() {
    var len = aSpan.length;
    for (var i = 0; i < len; i++) {
        aSpan[i].className = 'sex';
    }
}

function filterSex(target) {
    var newArr = [],
        len = personArr.length;
    for (var i = 0; i < len; i++) {
        personArr[i].sex === target ? newArr.push(personArr[i]) : '';
    }
    return newArr;
}

function init() {
    (function() {
        var len = personArr.length;
        for (var i = 0; i < len; i++) {
            var li = document.createElement('li'),
                img = document.createElement('img'),
                span = document.createElement('span'),
                p = document.createElement('p');

            img.src = personArr[i].url;
            img.className = 'pic';
            span.innerText = personArr[i].description;
            p.innerText = personArr[i].name;
            li.appendChild(img);
            li.appendChild(p);
            li.appendChild(span);
            oUl.appendChild(li);
        }
    }())
}
init();

input.oninput = function() {
    var result = filterByText(this.value, personArr);
    console.log(result);
    clearTimeout(hTimer);
    hTimer = setTimeout(function() {
        if (result.length != 0) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                clearAll();
                filterTarget(result);
            }, 300);

        } else {
            clearAll();
            init();
        }
    }, 1000);
};

function filterTarget(target) {
    var len = target.length;
    for (var j = 0; j < len; j++) {
        var li = document.createElement('li'),
            img = document.createElement('img'),
            span = document.createElement('span'),
            p = document.createElement('p');

        img.src = target[j].url;
        img.className = 'pic';
        span.innerText = target[j].description;
        p.innerText = target[j].name;
        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(span);
        oUl.appendChild(li);
    }
}

function clearAll() {
    var child = oUl.children,
        len = child.length;
    for (var i = 0, j = 0; j < len; j++) {
        oUl.removeChild(child[i]);
    }
}

function filterByText(text, arr) {
    var newArr = [],
        len = arr.length;
    for (var i = 0; i < len; i++) {
        arr[i].name.indexOf(text) != -1 ? newArr.push(arr[i]) : '';
    }
    return newArr;
}