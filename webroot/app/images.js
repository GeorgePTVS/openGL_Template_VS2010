$(document).ready(function(){
  //alert('Document Ready' );
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $(".thumbnail").on('mouseenter mouseleave', function() {
    $(this).toggleClass('highlight');
    //alert('thumbnail hover')
  });
});