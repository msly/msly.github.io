(function() {
    var a = a || {
        version: "1-2-0"
    };
    a.page = a.page || {};
    a.page.getHeight = function() {
        var f = document,
        c = f.body,
        e = f.documentElement,
        d = f.compatMode == "BackCompat" ? c: f.documentElement;
        return Math.max(e.scrollHeight, c.scrollHeight, d.clientHeight)
    };
    var b = {
        _resize_Interval: 0,
        _last_height: 0,
        autoHeight: function() {
            b._resize_Interval = setInterval(function() {
                var c = a.page.getHeight();
                b.setHeight(c)
            },
            100)
        },
        clearAutoHeight: function() {
            clearInterval(b._resize_Interval)
        },
        setHeight: function(c) {
            if (c != b._last_height) {
                b._last_height = c;
//                var d = document.createElement("iframe");
//                d.src = "bdjs_callback.html#method=resize&height=" + c + "&stamp=" + ((new Date()).getTime().toString(32));
//                d.style.visibility = "hidden";
//                d.style.width = d.style.height = "0px";
//                d.style.position = "absolute";
//                document.body.appendChild(d)
            }
        }
    };
    window.bdjs = b;
    b.autoHeight()
})();