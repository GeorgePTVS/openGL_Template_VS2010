$(document).ready(function(){
  // alert('Document Ready' );
    var winWidth  = $( window ).width();
    var winHeight = $( window ).height();
    
    // set main_content width rel to window and height rel to width
    var MAIN_W_SCALAR = 0.7;
    var mainWidth  = MAIN_W_SCALAR * winWidth;
    var mainHeight = mainWidth;
    
    // have to account for aspect ratio.  
    if ( winWidth < winHeight )
    {
      mainWidth = MAIN_W_SCALAR * winWidth;
      mainHeight = mainWidth;
    }
    else
    {
      mainHeight = MAIN_W_SCALAR * winHeight;
      mainWidth = mainHeight;
    }
    $("body").css("width",  mainWidth);
    // $(".main_content").css("width",  mainWidth);
    $(".main_content").css("height", mainHeight);
    alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
    $("button").on('click', function() {
    alert("Hello World");
    } );
 
});