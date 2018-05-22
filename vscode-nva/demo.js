// 'use strict';

var menuNva = document.getElementsByClassName('menuNva')[0],
    aLi = menuNva.getElementsByTagName('li'),
    oDiv = document.getElementsByTagName('div'),
    fNva = document.getElementsByClassName('fNva')[0],
    fALi = fNva.getElementsByTagName('li'),
    fDiv = document.getElementsByClassName('f_more')[0],
    flag = false;

window.org.addEvent(menuNva, 'mouseover', function() {
    'use strict';
    window.org.addEvent(menuNva, 'click', function(e) {
        flag = true;
        var event = e || window.event,
            target = event.target || event.srcElement,
            divTarget = oDiv[parseInt(target.getAttribute('flag'))],
            org = window.org;
        target.className = 'active';
        divTarget.style.display = 'block';
        org.addEvent(menuNva, 'mouseover', over);
        org.addEvent(menuNva, 'click', close);
        org.addEvent(menuNva, 'mouseout', out);
        org.addEvent(divTarget, 'mouseover', menuOver);
    });
});

function over(e) {
    'use strict';
    if (flag) {
        var event = e || window.event,
            target = event.target || event.srcElement,
            aLen = aLi.length,
            divLen = oDiv.length,
            org = window.org,
            divTarget = oDiv[parseInt(target.getAttribute('flag'))];
        for (var i = 0; i < aLen; i++) {
            aLi[i].className = '';
        }
        for (var j = 1; j < divLen; j++) {
            oDiv[j].style.display = 'none';
        }
        target.className = 'active';
        divTarget.style.display = 'block';
        org.addEvent(menuNva, 'click', close);
        org.addEvent(divTarget, 'mouseover', menuOver);
        org.addEvent(menuNva, 'mouseout', out);
    }
}

function menuOver() {
    'use strict';
    window.org.addEvent(fNva, 'mouseover', function(e) {
        document.removeEventListener('click', all, false);
        var event = e || window.wvent,
            target = event.target || event.srcElement,
            len = fALi.length,
            org = window.org;
        for (var i = 0; i < len; i++) {
            fALi[i].className = '';
        }
        target.className = 'active';
        if (target.getAttribute('flag') === 'nearFile') {
            fDiv.style.display = 'block';
        } else {
            fDiv.style.display = 'none';
        }
        org.addEvent(fNva, 'mouseout', out);
    });
}

function out() {
    'use strict';
    window.org.addEvent(document, 'click', all);
}

function all() {
    'use strict';
    var divLen = oDiv.length,
        aLen = aLi.length;
    for (var j = 1; j < divLen; j++) {
        oDiv[j].style.display = 'none';
    }
    for (var i = 0; i < aLen; i++) {
        aLi[i].className = '';
    }
    flag = false;
    menuNva.removeEventListener('mouseout', out, false);
    document.removeEventListener('click', all, false);
}

function close(e) {
    'use strict';
    var event = e || window.event,
        target = event.target || event.srcElement,
        divLen = oDiv.length;
    for (var j = 1; j < divLen; j++) {
        oDiv[j].style.display = 'none';
    }
    target.className = '';
    flag = false;
    menuNva.removeEventListener('click', close, false);
}