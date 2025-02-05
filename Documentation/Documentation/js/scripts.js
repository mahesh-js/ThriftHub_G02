(function($){

  "use strict";

  $(window).load(function() {

    // Preloader
    $('.loader').fadeOut();
    $('.loader-mask').delay(350).fadeOut('slow');
    $(window).trigger("resize");

  });

  $('#toc').toc();

})(jQuery);


