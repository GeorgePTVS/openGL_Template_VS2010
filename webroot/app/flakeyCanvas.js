$(document).ready(function(){
  // alert('Document Ready' );
  //alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $(".colorChooserDiv").on('click', function() {
//  alert("Flakey color button. id=" + this.id + " hex color = " + this.style.background-color);

  var newColor = $(this).css("background-color");
  alert("Flakey color button. hex color = " + newColor);
  $("#yellow").css("background-color", newColor);
  } );

});