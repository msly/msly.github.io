jQuery.fn.topLink = function(settings) {
  settings = jQuery.extend({
    min: 1,
    fadeSpeed: 300
  }, settings);
  $(this).bind("click",function(){
    var body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");
    body.animate({scrollTop: $($(this).attr("href")).offset().top - 10}, 400);
    return false;
  })
  return this.each(function() {
    var el = $(this);
    el.hide();
    $(window).scroll(function() {
      if($(window).scrollTop() >= settings.min)
      {
        el.fadeIn(settings.fadeSpeed);
      }
      else
      {
        el.fadeOut(settings.fadeSpeed);
      }
    });
  });
};