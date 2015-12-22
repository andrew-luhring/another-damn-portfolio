jQuery(document).ready(function($){

	$(".no-collapse").on("click", function(e){
      e.preventDefault();
	});


function faqTabs(pos){
        console.log("pos after faq function is " + pos);
  $('article.adss_faq_tab .adss_faq_tab_question_container').hide();
  $('article.adss_faq_tab.active .adss_faq_tab_question_container').css("left", -pos + "px").stop(true,true).show("fade", "slow",function(){
  });
  $('.adss_faq_tab_header, .adss_faq_tab_header h1').show();
}


$('.adss_faq_tab_header').click(function(){
  if($(this).parent("article").hasClass("active")){
  } else{
    $(this).parent("article").addClass("active");
        var pos = $(this).parent("article").position().left;
        console.log("pos before faq function is " + pos);
        faqTabs(pos);
  }
  if($(this).parent("article").siblings().hasClass("active")){
    $(this).parent("article").siblings().removeClass("active").find($(".adss_faq_tab_question_container")).hide();
  }
});
faqTabs();
});



var isDetailsSupported = (function(doc) {
  var el = doc.createElement('details'),
      fake,
      root,
      diff;
  if (!('open' in el)) {
    return false;
  }
  root = doc.body || (function() {
    var de = doc.documentElement;
    fake = true;
    return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
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
  } else{
    document.documentElement.className += ' details';
  }
  (function() {
  $(function() {
    if($('html').hasClass("no-details")){
      if (Modernizr.details) {
        return;
      }

    return $(document).on('click', 'summary', function(event) {
      var $details, $summary;
      $summary = $(this);
      $details = $summary.parent();
      if ($details.attr('open')) {
      if($details.hasClass("no-collapse")){
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
