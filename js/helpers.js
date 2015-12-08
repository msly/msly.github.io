function asset_wrap() {
	var i = 0;
	function asset(path) {
		i %= 4;
		i++;
		return '//s' + i + '.tool.lu/' + path;
	}
	return asset;
}
window.asset = asset_wrap();

function url(path) {
	rootUrl = window.rootUrl || '//' + window.location.hostname + '/';
	return rootUrl + path;
}

Util = {
	escapeRegExp: function (str) {
		return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');	
	},
	
	trim: function(str, characters){
    	characters = Util.escapeRegExp(characters);
    	return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
    	characters = Util.escapeRegExp(characters);
    	return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
    	characters = Util.escapeRegExp(characters);
    	return String(str).replace(new RegExp(characters + '+$'), '');
    },
};

window.ltrim = Util.ltrim;