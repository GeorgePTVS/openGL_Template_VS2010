$(document).ready(function(){
  //alert('Document Ready' );
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $(".thumbnail").on('mouseenter', function() {
    $(this).addClass('highlight');
    //alert('thumbnail hover')
  });
});