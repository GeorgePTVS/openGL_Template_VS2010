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


// put a solid border around color chooser during hover.  Have to manip size since border starts as 0.  
$( ".colorChooserDiv" ).hover(
  // TODO Use addClass removeClass (or toggleClass) in each of these fns)
  function() {
    var tempBorder = 5;  // px
    var oldWidth  = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width",  oldWidth  - tempBorder*2);
    $(this).css("height", oldHeight - tempBorder*2);
    $(this).css("border", tempBorder + "px solid gray");
  }, function() {
    var tempBorder = 5;  // px
    var oldWidth  = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width",  oldWidth  + tempBorder*2);
    $(this).css("height", oldHeight + tempBorder*2);
    $(this).css("border", "0");
  }
);  
});