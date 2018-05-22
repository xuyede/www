// login-btn  #username #password

'use strict';

var oBtn = $('.login-btn'),
    oDiv = $('.error-tips'),
    oUsername = $('#username'),
    oPassword = $('#password'),
    regUser = /\d{11}/g,
    regPwd = /^[A-Z]\w{5,13}/g,
    flag = true;

oBtn.on('click', function() {
    if (flag) {
        oUsername.on('focus', function() {
            oDiv.fadeOut('slow');
        });
        oPassword.on('focus', function() {
            oDiv.fadeOut('slow');
        });
        if (oUsername.val() === '' || oPassword.val() === '') {
            oDiv.fadeIn('slow');
        } else {
            if (regPwd.test(oPassword.val()) && regUser.test(oUsername.val())) {
                oBtn.text('登录中...');
                flag = false;
            } else {
                oDiv.fadeIn('slow');
            }
        }
    }
});