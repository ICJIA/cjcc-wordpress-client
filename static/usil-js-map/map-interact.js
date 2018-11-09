function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=usiljs]").each(function (i, e) {
    usiladdEvent( jQuery(e).attr("id"));
  });
});
function usiladdEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#usiljsvn" + arr.slice(6).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":usiljsconfig.general.visibleNames});
  _obj.attr({"fill":usiljsconfig[id].upColor, "stroke":usiljsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (usiljsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#usiljstip").show().html(usiljsconfig[id].hover);
      _obj.css({"fill":usiljsconfig[id].overColor});
    }, function () {
      jQuery("#usiljstip").hide();
      jQuery("#" + id).css({"fill":usiljsconfig[id].upColor});
    });
    if (usiljsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":usiljsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":usiljsconfig[id].overColor});
      if (usiljsconfig[id].target === "new_window") {
        window.open(usiljsconfig[id].url);	
      } else if (usiljsconfig[id].target === "same_window") {
        window.parent.location.href = usiljsconfig[id].url;
      } else if (usiljsconfig[id].target === "modal") {
        jQuery(usiljsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#usiljstip").outerWidth(), tiph =jQuery("#usiljstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#usiljstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#usiljstip").outerWidth(), tiph =jQuery("#usiljstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":usiljsconfig[id].downColor});
        jQuery("#usiljstip").show().html(usiljsconfig[id].hover);
        jQuery("#usiljstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":usiljsconfig[id].upColor});
        if (usiljsconfig[id].target === "new_window") {
          window.open(usiljsconfig[id].url);
        } else if (usiljsconfig[id].target === "same_window") {
          window.parent.location.href = usiljsconfig[id].url;
        } else if (usiljsconfig[id].target === "modal") {
          jQuery(usiljsconfig[id].url).modal("show");
        }
      });
    }
	}
}