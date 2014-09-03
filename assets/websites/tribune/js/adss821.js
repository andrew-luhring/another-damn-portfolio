var pos = 0;
/*
if you want to use the scrollToAnchor function, all that you need to do is have an anchor with the id of the element that you want to scroll to as an href
it even works if you have a full url- as long as it ends with: "#id_example" .
for example I want the page to scroll to the Automotive article somewhere on the page when I click on a link.
the only thing I have to do is make sure the link points correctly to the id of the article; ie:
<a href="http://ngux.latimes.testprod.tribdev.com/advertiser#Automotive">click here to scroll to the article</a> <article id="Automotive" >blah</article>
will work as well as:
<a href="#Automotive">see how this also works?! </a>
:-)
#swag.
 */
var scrollTime = 2000;
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
    var adssStyle = $("link").hasClass("adss");
    if (adssStyle === false) {
        $(adssCssString).appendTo("head");
    }
}
function restoreImgSize() {
    if (document.body.contains(document.querySelector("#distribution"))) {
        var $figImg = $("img"), imgs = $.makeArray($("img"));
        var regex = /[A-z0-9-/.:]*[?!0-9]/ ;
        var numbers = /\/[0-9]+/g;
        $(imgs).each(function (index) {
            var ci = $(this).attr("src");
            if (regex.test(ci)) {
                var result = regex.exec(ci);
                    var currentImg = result;
                    var abc = "img[src*='" + currentImg + "']";
                    var def = ci.match(numbers);
                    var hij = ci.replace(def, "");
                $(abc).attr("src", hij);
            }
        });
    }
}
var giveTophatZPrecedence = (function () {
    if (document.querySelector("[data-trb-thirdpartynav]") && document.querySelector(".trb_adss_allContentWrapper")) {
        var nav = document.querySelector("[data-trb-thirdpartynav]"),
            adss = document.querySelector(".trb_adss_allContentWrapper"),
            navz = nav.style.zIndex,
            adssz = 1;
        adss.style.zIndex = 1;
        if (navz !== 1) {
            if (navz > 1) {
                navz = navz;
            } else {
                navz = nav.style.zIndex = 2;
                adssz = adss.style.zIndex;
            }
        }
        if (adssz >= navz) {
            adssz = navz - 1;
        }
    }
});

function scrollToAnchor(x) {
    var $that = $(x);
    var hashTag = /([#][A-z0-9]*)/;
    if ($that.attr("href").length > 1) {
        var link = $that.attr("href");
        var thatObject = {
            link: link,
            exists: function () {
                var tested = hashTag.test(this.link);
                return tested;
            },
            getIt: function () {
                var matched = this.link.match(hashTag);
                return matched;
            },
            stringify: function () {
                if (this.getIt().length >= 1) {
                    var yay = this.getIt()[0];
                    return yay;
                } else {
                    var boo = false;
                    return boo;
                }
            },
            selectorfy: function () {
                var stringifyed = this.stringify(),
                    string = stringifyed,
                    $selector = $(string);
                return $selector;
            }
        };
        var $selector = thatObject.selectorfy();
        if ($selector.length >=1) {
            thatObject.offset = $selector.offset();
            $("html, body").animate({
                scrollTop: thatObject.offset.top
            }, scrollTime);
        }
    }
}
jQuery(document).ready(function ($) {
    $("a[href*='#']").click(function (e) {
        e.preventDefault();
    });
    $("a[href*='#']").click(function () {
        var $that = $(this);
        if($("body").find($that)){
            scrollToAnchor($that);
        }
    });

    $("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $("html,body").stop(true, false);
        }
    });
    if (document.body.contains(document.querySelector("#adss_faq"))) {
        $('body').contents().find(
            "#adss_faq .adss_faq_tab .adss_faq_tab_header").click( function () {
            iLikeTurtles($(this));
        });
        iLikeTurtles($(" .adss_faq_tab.active .adss_faq_tab_header"));
    }

    $("dt, dd").hover(function () {
        $(this).siblings("dd, dt, .adss_fig_num_pointer").andSelf().css({
            "background": "#408cb3",
                "border-color": "#408cb3",
                "color": "#fff",
                "box-shadow": "0px 0px 8px 0px #408cb3"
        }).addClass("adss_figure_number_hover");
    }, function () {
        $(this).siblings("dd, .adss_fig_num_pointer").andSelf().css({
            "background": "#999",
                "border-color": "#999",
                "box-shadow": "none"
        }).removeClass("adss_figure_number_hover");
        $("dt").andSelf().css({
            "color": "#333",
                "background": "inherit",
                "box-shadow": "none"
        }).removeClass("adss_figure_number_hover");
    });

    var openLinks = (function () {
        if (window.frameElement) {
            var wfn = window.frameElement.nodeName;
            wfn = wfn.toLowerCase(wfn);
            if (wfn === "iframe") {
                var as = $("a").get();
                $.each(as, function (index) {
                    var $a = $(as).eq(index);
                    $a.attr("target", "_top");
                });
            }
        }
    })();
    giveTophatZPrecedence();
    getStuff();
    window.setTimeout(restoreImgSize, 1000);
});

var Modernizr = Modernizr;
var isDetailsSupported = (function (doc) {
    var el = doc.createElement('details'),
        fake, root, diff;
    if (!('open' in el)) {
        return false;
    }
    root = doc.body || (function () {
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
(function () {
    $(function () {
        if ($('html').hasClass("no-details")) {
            if (Modernizr.details) {
                return;
            }
            return $(document).on('click', 'summary', function (event) {
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