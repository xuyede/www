var oBtn = document.getElementsByClassName('start-game')[0],
    oWrapper = document.getElementsByClassName('wrapper')[0],
    oLeiBox = document.getElementsByClassName('lei-box')[0],
    oResidueBoom = document.getElementsByClassName('residue')[0],
    oClose = document.getElementsByClassName('close')[0],
    aBoom = document.getElementsByClassName('boom'),
    boomNum = 10,
    flag = true;

bindEvent();
function bindEvent() {
    oBtn.onclick = function () {
        this.style.display = 'none';
        oWrapper.style.display = 'block';
        document.body.style.backgroundColor = '#ccc';
        init();
    };
    oClose.onclick = function () {
        oLeiBox.innerHTML = '';
        oWrapper.style.display = 'none';
        oBtn.style.display = 'block';
        document.body.style.backgroundColor = '#fff';
    };
    oLeiBox.oncontextmenu = function () {
        return false;
    };
    oLeiBox.onmousedown = function (e) {
        var event = e || window.event,
            target = event.target || event.srcElement;

        if (e.button === 0) {
            leftBtnClick(target);
        } else if (e.button === 2) {
            rightBtnClick(target);
        }
    };
}

function rightBtnClick(ele) {

    var _ele = ele,
        num = 0;
    if (!_ele.classList.contains('clicked')) {
        _ele.classList.toggle('flag');
    }

    num = boomNum - document.getElementsByClassName('flag').length;
    if (num == 0) {
        num = 0;
    }
    oResidueBoom.innerHTML = num;

}

function leftBtnClick(ele) {
    var _ele = ele,
        len = aBoom.length,
        aroundBoom = 0,
        arr = _ele && _ele.getAttribute('id').split('-'),
        x = arr && +arr[0],
        y = arr && +arr[1];

    _ele.classList.add('color2');
    _ele.classList.add('clicked');

    if (_ele && _ele.classList.contains('boom')) {
        for (var i = 0; i < len; i++) {
            aBoom[i].innerHTML = 'Boom';
        }
        window.setTimeout(function () {
            var restart = window.confirm('菜，还来不?');
            if (restart) {
                oLeiBox.innerHTML = '';
                init();
            } else {
                oLeiBox.innerHTML = '';
                oWrapper.style.display = 'none';
                oBtn.style.display = 'block';
                document.body.style.backgroundColor = '#fff';
            }
        }, 800);
    } else {
        _ele.classList.remove();
        _ele.classList.add('tips');
        for (var r = x - 1; r <= x + 1; r++) {
            for (var l = y - 1; l <= y + 1; l++) {
                var aroundEle = document.getElementById(r + '-' + l);
                if (aroundEle && aroundEle.classList.contains('boom')) {
                    aroundBoom++;
                }
            }
        }
        if (aroundBoom === 0) {
            aroundBoom = '';
        } else {
            aroundBoom += '';
        }
        _ele.innerHTML = aroundBoom;
        if (aroundBoom === '') {
            for (var _r = x - 1; _r <= x + 1; _r++) {
                for (var _l = y - 1; _l <= y + 1; _l++) {
                    var temp = document.getElementById(_r + '-' + _l);
                    if (temp && !temp.classList.contains('boom')) {
                        if (!temp.classList.contains('done')) {
                            temp.classList.add('done');
                            leftBtnClick(temp);
                        }
                    }
                }
            }
        }
    }
}

function init() {
    var oFraf = document.createDocumentFragment(),
        boomNum = 10;

    oResidueBoom.innerHTML = boomNum;

    for (var row = 0; row < 10; row++) {
        for (var line = 0; line < 10; line++) {
            var _block = document.createElement('div');
            _block.classList.add('color1');
            _block.classList.add('block');
            _block.setAttribute('id', row + '-' + line);
            oFraf.appendChild(_block);
        }
    }
    oLeiBox.appendChild(oFraf);

    while (boomNum) {
        var boom = Math.floor(Math.random() * 100);
        if (!oLeiBox.children[boom].classList.contains('boom')) {
            oLeiBox.children[boom].classList.add('boom');
            boomNum--;
        }
    }
}