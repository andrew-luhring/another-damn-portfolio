var pos = 0;
function tabsAreCool(x, pos) {

	$(x).parent().siblings().find('.adss_faq_tab_question_container').hide();
	$(".adss_question").hide();
	$(x).parent().siblings().find(".adss_question").hide();
	$(x).siblings('.adss_faq_tab_question_container').css("left", -pos + "px").stop(true, true).show("fade", "fast");
	$('.adss_faq_tab.active .adss_faq_tab_question_container, .adss_faq_tab.active .adss_question').show();

}
function iLikeTurtles(x) {
	$(x).parent().addClass("active");
	$(x).parent().siblings().removeClass("active");
	pos = $(x).parent().position().left;
	tabsAreCool(x, pos);

}

function getStuff() {
	$("<link rel='stylesheet' href='http://www.latimes.local.tribdev.com/assets/lanews/stylesheets/adss.css' />").appendTo("head");
}
function restoreImgSize(){
	if(document.body.contains(document.querySelector("#distribution"))){


    var $figImg = $("#distribution figure img");
    	var imgSrc = $figImg.attr("src");
        var realImg=	 imgSrc.slice(0, -5);
        $("#distribution figure img").attr("src", realImg).css({
            "height": "auto",
            "width": "auto"
        });
        }
}

jQuery(document).ready(function($) {
	getStuff();
	if(document.body.contains(document.querySelector("#adss_faq"))){
			$('body').contents().find("#adss_faq .adss_faq_tab .adss_faq_tab_header").click(function() {
				iLikeTurtles($(this));
			});
			iLikeTurtles($(" .adss_faq_tab.active .adss_faq_tab_header"));
	}
window.setTimeout(restoreImgSize(), 1000);

    $("dt, dd").hover(function(){
		$(this).siblings("dd, dt").andSelf().css({
			"background": "#f0ffff",
			"border-color": "#f0ffff",
			"box-shadow": "0px 0px 8px 0px #f0ffff"
		})},
		function(){
			$(this).siblings("dd,dt").andSelf().css({
				"background": "none",
				"border-color": "black",
				"box-shadow": "none"
			});
		});
});
var Modernizr = Modernizr;
var isDetailsSupported = (function(doc) {
	var el = doc.createElement('details'), fake, root, diff;
	if (!('open' in el)) {
		return false;
	}
	root = doc.body
			|| (function() {
				var de = doc.documentElement;
				fake = true;
				return de.insertBefore(doc.createElement('body'),
						de.firstElementChild || de.firstChild);
			}());
	el.innerHTML = '<summary>a</summary>b';
	el.style.display = 'block';
	root.appendChild(el);
	diff = el.offsetHeight;
	el.open = true;
	diff = diff !== el.offsetHeight;
	root.removeChild(el);
	if (fake) {
		root.parentNode.removeChild(root);
	}
	return diff;
}(document));
if (!isDetailsSupported) {
	document.documentElement.className += ' no-details';
} else {
	document.documentElement.className += ' details';
}
(function() {
	$(function() {
		if ($('html').hasClass("no-details")) {
			if (Modernizr.details) {
				return;
			}
			return $(document).on('click', 'summary', function(event) {
				var $details, $summary;
				$summary = $(this);
				$details = $summary.parent();
				if ($details.attr('open')) {
					if ($details.hasClass("no-collapse")) {
					} else {
						return $details.removeAttr('open');
					}
				} else {
					return $details.attr('open', 'open');
				}
			});
		}
	});
}).call(this);
