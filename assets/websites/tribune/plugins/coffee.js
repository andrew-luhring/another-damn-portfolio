// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    if (Modernizr.details) {
      return;
    }
    return $(document).on('click', 'summary', function(event) {
      var $details, $summary;
      $summary = $(this);
      $details = $summary.parent();
      if ($details.attr('open')) {
        return $details.removeAttr('open');
      } else {
        return $details.attr('open', 'open');
      }
    });
  });

}).call(this);
