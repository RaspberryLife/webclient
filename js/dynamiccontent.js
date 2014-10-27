$(function() {

  if(Modernizr.history){
    var newHash      = "",
    $mainContent = $("#main-content"),
    $el;

    $("nav").delegate("a", "click", function() {
      _link = $(this).attr("href");
      history.pushState(null, null, _link);
      loadContent(_link);
      return false;
    });

    function loadContent(href){
      $mainContent
      .find("#guts")
      .fadeOut(200, function() {
        $mainContent.hide().load(href + " #guts", function() {
          $mainContent.fadeIn(200, function() {
          });
          $("nav li").removeClass("active");
          console.log(href+" loaded");
          $("nav a[href$='"+href+"']").parent().addClass("active");
        });
      });
      
      if(href=="debug.html"){
        console.log("yeah!");
        getScript("js/debug.js");
      }
    }

    $(window).bind('popstate', function(){
      _link = location.pathname.replace(/^.*[\\\/]/, '');
      loadContent(_link);
    });
  }
});
