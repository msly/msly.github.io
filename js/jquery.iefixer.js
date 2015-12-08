(function($) {
	$.fn.iefixer = function() {
		var ie = $.browser.msie;
		var ver = $.browser.version;
		if (ie && ver <= 7) {
			$.fn.origval = $.fn.val;
			$.fn.val = function(value) {
				var elem = this[0];
				if (value === undefined) {
					var returnVal = null;
					if (elem.nodeName.toLowerCase() == 'button') {
						returnVal = elem.getAttributeNode("value").nodeValue
					} else {
						returnVal = $(elem).origval()
					}
					return returnVal
				} else {
					if (elem.nodeName.toLowerCase() == 'button') {
						elem.getAttributeNode("value").nodeValue = value
					} else {
						$(elem).origval(value)
					}
				}
			}
		}
	}
})(jQuery);