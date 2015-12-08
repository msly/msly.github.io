$(function(){
	if (window.console) {
		console.log('%c在线工具\n%chttp://tool.lu\n-------------\nQQ交流群: 174157258', 'color:#009a61; font-size: 28px;', 'color:#009a61');
	}

	// if (top.location != self.location) top.location=self.location;

	/* nav scroll fixed */
	var nav = $('#nav');
	nav.scrollToFixed();
	$('.note').scrollToFixed({
		marginTop: nav.outerHeight() + 10
	});

	/* zeroclipborad */
	ZeroClipboard.config({
		swfPath: asset('js/zeroclipboard/ZeroClipboard.swf'),
		forceHandCursor: true
	});
	var _isShow = false;
	var client2 = new ZeroClipboard($('#t_fixed .qq-qun'));
	client2.on('afterCopy', function (e) {
		if (_isShow) {
			return;
		}
		_isShow = true;
		new $.flavr({
			animateEntrance: 'bounce',
			buttonDisplay: "stacked",
			buttons: {
				"close": {style: "default", text: "知道啦！"}	
			},
			content: "已经拷贝了哦！",
			autoclose: true,
			timeout: 3000,
			onClose: function(){
				_isShow = false
			}
		});
	});
	var client1 = new ZeroClipboard($('#shorturl'));
	client1.on('copy', function (e) {
		var clipboard = e.clipboardData;
		clipboard.setData({
			"text/plain": $(e.target).val()
		});
	});
	client1.on('afterCopy', function (e) {
		if (_isShow) {
			return;
		}
		_isShow = true;
		new $.flavr({
			animateEntrance: 'bounce',
			buttonDisplay: "stacked",
			buttons: {
				"close": {style: "default", text: "知道啦！"}	
			},
			content: "已经拷贝了哦！",
			autoclose: true,
			timeout: 3000,
			onClose: function(){
				_isShow = false
			}
		});
	});
	$('#t_fixed .js-tip').tipsy({gravity: 'e', fade: true, fadeIn: 300, fadeOut: 300});

	//textarea中Tab键
	$('#code').keydown(function(e){
		if (e.which == 9 && !e.ctrlKey && !e.altKey) {
			if (e.target.setSelectionRange) {
				var start = e.target.selectionStart, end = e.target.selectionEnd;
				var top = e.target.scrollTop;

				var sel = e.target.value.substring(start, end);
				var contain_n = false;
				// [\r\n]+
				if(/\r?\n|\r/.test(sel)) {
					contain_n = true;
				}

				if (start !== end && contain_n) {
					start = e.target.value.lastIndexOf("\n", start) + 1;
				}
				
				if (e.shiftKey) {
					sel = sel.replace(/^(\t| {1,4})/gm, '');
				} else {
					if(contain_n) {
						sel = sel.replace(/^/gm, '\t');
					} else {
						sel = '\t';
					}
				}
				e.target.value = e.target.value.substring(0, start) + sel + e.target.value.substr(end);
				// here need modify
				e.target.setSelectionRange(start === end ? start + 1 : start, start + sel.length);
				e.target.focus();
				e.target.scrollTop = top;
			} else if (e.target.createTextRange) {
				document.selection.createRange().text = "\t";
			}
			if ($.browser.opera) {
				$(this).one('keypress', function(e) { return false; });
			}
			return false;
		}
	}).focus(function(){
		if ($(this).val() != "") {
			$("#clear").show();
		} else {
			$("#clear").hide();
		}
	}).keyup(function(){
		if ($(this).val() != "") {
			$("#clear").show();
		} else {
			$("#clear").hide();
		}
	});
	$("#clear").bind("click",function(){
		$('#code').val("");
		$(this).hide();
	}).hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	if ($('#code').val() != "") {
		$("#clear").show();
	} else {
		$("#clear").hide();
	}

	/* notice scroll */
	function scroll(){
		var e = $("#broadcast div:first"),
			t = e.height();
		e.animate({
			marginTop: "-" + t + "px",
			opacity: "0"
		}, 500, function() {
			// detach 和 remove 一样，不过可以继续 appendTo
			$(this).detach().appendTo("#broadcast").removeAttr("style")
		});
	}
	var _notice = setInterval(scroll, 5e3);
	$("#broadcast").on('mouseenter', function(){
		clearInterval(_notice);
	}).on('mouseleave', function(){
		_notice = setInterval(scroll, 5e3);
	});

	$('.js-attach-link').on('click', function (e) {
		if (_isShow) {
			return;
		}
		new $.flavr({
			animateEntrance: 'bounce',
			buttonDisplay: "stacked",
			buttons: {
				"close": {style: "default", text: "知道啦！"}	
			},
			content: "<p style=\"text-align: left;\">交换链接需满足以下条件：</p><ol style=\"text-align: left;\"><li>你的网站建站时间已满1年</li><li>内容原创，版面整洁，无弹窗广告</li><li>暂时不接受个人博客类的</li></ol><p>请联系QQ: 245565986</p>",
			onClose: function(){
				_isShow = false
			}
		});
	});

	window.showLoginModal = function () {
		new $.flavr({
			title: '登录',
			dialog: 'form',
			form: {
				content: $('#login_modal').html(),
				method: 'POST',
				action: 'http://plus.tool.lu/user/login',
				onSubmit: function ($container, $form) {
					// return false;
				}
			}
		});
	};

	$('.js-login').on('click', function (e) {
		e.preventDefault();
		showLoginModal();
	});

	$('.js-fixed-summary').on('click', function (e) {
		e.preventDefault();
		$(this).removeClass('fixed-summary');
	});

	$('a.js-track').on('click', function (e) {
		// ... 打点
		var thiz = $(this);
		var link = thiz.attr('href');
		var text = thiz.text();
		var referrer = document.URL;
		// console.log(link, text);
	});

	$.getJSON('//tool.lu/hello?callback=?', function (data) {
		$('#js_login_bar').html(data.info);
	});

	//var title = document.title;
	//$(window).on('blur', function () {
	//	document.title = "\u266C 对面的女孩的看过来，看过来，看过来... \u266C";
	//}).on('focus', function (e) {
	//	document.title = title;
	//});
	// $('.smartsearch-trigger').on('click', function (e) {
	// 	$('.smartsearch-overlay').show();
	// 	$('.js-smartsearch-input').focus();
	// 	var term = $('.js-smartsearch-input').val();
	// 	$('.js-smartsearch-input').autocomplete('search', term);
	// });
	// $('.smartsearch-overlay').on('click', function (e) {
	// 	if ($(e.target).hasClass('smartsearch-overlay')) {
	// 		$(this).hide();
	// 	}
	// });
	// $('.js-smartsearch-input').autocomplete({
	// 	minLength: 0,
	// 	autoFocus: true,
	// 	appendTo: '.js-smartsearch-result',
	// 	position: {my: 'left top', at: 'left top', of: '.js-smartsearch-result'},
	// 	focus: function (e, ui) {
	// 		return false;
	// 	},
	// 	select: function (e, ui) {
	// 		window.location = ui.item.value
	// 		return false;
	// 	},
	// 	source: url('search/suggest'),
	// });
	// $('.js-smartsearch-input').autocomplete('instance').close = function () {};
	// $('.js-smartsearch-input').autocomplete('instance')._renderItem = function (ul, item) {
	// 	var a = $('<a>').text(item.label).attr('href', item.value);
	// 	return $('<li>')
	// 		.append(a)
	// 		.attr("data-value", item.value)
	// 		.appendTo(ul);
	// };
});

/* add to fav */
function addToFavorite() {
	var url = "http://tool.lu/",
		title = "在线工具 - 程序猿的在线工具";
	document.all ? window.external.AddFavorite(url, title) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(title, url, "") : alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。")
}

function flash(e) {
    var e = $(e), a = 255, b = 239, c = 0, d = 1, to;
    a = 239;
    b = 191;
    c = 1;
    d = 4;
    setTimeout(function() {
        $(window).scrollTop(e.offset().top - 50);
    }, 10);
    to = setInterval(function() {
        a += c;
        b += d;
        e.css("backgroundColor", "#ff" + a.toString(16) + b.toString(16));
        if (b >= 255) {
            clearInterval(to);
            to = null;
            e.css("backgroundColor", "#f3e4b1");
        }
    }, 60);
    return e.css("backgroundColor", "#ff" + a.toString(16) + b.toString(16));
}

function noticeTitle() {
    var orgTitle = document.title;
    var notice = {
        state: false,
        title: orgTitle,
        flash: 0,
        sleep: 15
    };
    setInterval(function () {
        if (notice['flash'] < 5 || notice['flash'] > 4 && !notice['state']) {
            document.title = (notice['state'] ? '【　　　】' : '【新提醒】') + orgTitle;
            notice['state'] = !notice['state'];
        }
        notice['flash'] = notice['flash'] < notice['sleep'] ? ++notice['flash'] : 0;
    }, 300);
}