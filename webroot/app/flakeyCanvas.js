$(document).ready(function(){
  // alert('Document Ready' );
  //alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $(".colorButton").on('click', function() {
  alert("Flakey color button");
  } );

});