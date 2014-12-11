function onWindowResize()
{
  var winWidth  = $( window ).width();
  var winHeight = $( window ).height();
  
  // set main_content width rel to window and height rel to width
  var MAIN_W_SCALAR = 0.8;
  var COLOR_CHOOSER_SCALAR = 0.05;
  var mainWidth  = MAIN_W_SCALAR * winWidth;
  var mainHeight = mainWidth;

  // if ( !oneTimeOnly )
    // alert('onWindowResize. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
    
  // var oneTimeOnly = true;  
  
  var colorChooserWidth = mainWidth * COLOR_CHOOSER_SCALAR;
  // have to account for aspect ratio.  
  if ( winWidth < winHeight )
  {
    mainWidth = MAIN_W_SCALAR * winWidth + colorChooserWidth;
    mainHeight = mainWidth;
  }
  else
  {
    mainHeight = MAIN_W_SCALAR * winHeight;
    mainWidth = mainHeight + colorChooserWidth;
  }
  var contentWidth = mainWidth + colorChooserWidth + 5;
  var canvasPlaceholderWidth  = mainWidth;
  var canvasPlaceholderHeight = mainHeight - 50;
  var buttonBarPlaceholderWidth  = colorChooserWidth;
  var buttonBarPlaceholderHeight = canvasPlaceholderHeight;
  
  
  $(".main_body").css("width",  mainWidth);
  $(".main_content").css("width",  contentWidth);
  $(".main_content").css("height", mainHeight);

  $(".colorChooserDiv").css("width",  colorChooserWidth);
  $(".colorChooserDiv").css("height", colorChooserWidth);
  $("#canvasPlaceholder").css( {
    "width": canvasPlaceholderWidth, 
    "height": canvasPlaceholderHeight,
    "background" : "#333333" ,
    });
  $("#buttonBarPlaceholder").css( {
    "width": buttonBarPlaceholderWidth, 
    "height": buttonBarPlaceholderHeight,
    "background" : "#6666FF" ,
    });
}    
