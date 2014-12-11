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
  var whitespaceFudge = 10;   // ugh this varied based on font I used in h1...a,p,div, etc
  var negWhitespaceFudge = -1*whitespaceFudge;
  var contentWidth = mainWidth + colorChooserWidth + whitespaceFudge;
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
    "background" : "#8866FF",
    "margin-top": "0px",
    "margin-right": whitespaceFudge,
    "margin-bottom": "0px",
    "margin-left": negWhitespaceFudge,
    // "margin-top": {"0px " + whitespaceFudge + "px 0px -" + whitespaceFudge + "px"}
    // "margin": "0px 10px 0px -10px"
    });
}    
