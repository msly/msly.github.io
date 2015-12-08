(function ($) {
	// ...
	$('.overlay-close').on('click', function (e) {
		// console.log('close the overlay');
		$(this).parent('.overlay').hide();
	});
	$('#generate').on('click', function (e) {
		var btn = $(this),
			url = btn.data('url'),
			regex = $('#searchText').val(),
			modifier = '',
			overlay = $('.overlay').eq(0),
			overlay_content = $('.overlay-content').eq(0),
			template = Handlebars.compile($('#entry_template').html());

		modifier += $('#flagI').prop('checked') && 'i' || '';
		modifier += $('#flagS').prop('checked') && 's' || '';
		modifier += $('#flagM').prop('checked') && 'm' || '';
		var _isShow = false;
		$.post(url, {'regexp': regex, modifier: modifier}, function (data) {
			var html = template({code: data});
			if (_isShow) {
				return;
			}
			new $.flavr({
				animateEntrance: 'bounce',
				buttonDisplay: "stacked",
				buttons: {
					"close": {style: "default", text: "知道啦！"}	
				},
				content: html,
				onShow: function(container) {
					// container.find('pre').each(function (i, block) {
					// 	hljs.highlightBlock(block);
					// });
				},
				onClose: function(){
					_isShow = false
				}
			});
		}, 'json');
	});
})(jQuery);