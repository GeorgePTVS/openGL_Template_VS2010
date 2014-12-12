$(document).ready(function(){
  // alert('Document Ready' );
  //alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $(".colorChooserDiv").on('click', function() {

  var newColor = $(this).css("background-color");
//  alert("Flakey color button. hex color = " + newColor);
  $("#yellow").css("background-color", newColor);
  } );

});