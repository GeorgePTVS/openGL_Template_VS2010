$(document).ready(function(){
  // alert('Document Ready' );
  //alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $("button").on('click', function() {
  alert("Hello World");
  } );

});