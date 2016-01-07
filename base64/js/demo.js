/*
 * JavaScript MD5 Demo JS 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, $ */

$(function () {
    'use strict';

    $('#encode').on('click', function (event) {
        event.preventDefault();
        $('#result').val(window.Base64.encode($('#input').val()));
    });
    $('#decode').on('click', function (event) {
        event.preventDefault();
        $('#result').val(window.Base64.decode($('#input').val()));
    });
    $('#input').val('MTIzNDU2 123456');

});
