function onWindowResize()
{
  var winWidth  = $( window ).width();
  var winHeight = $( window ).height();
  
  // set main_content width rel to window and height rel to width
  var mainWidth  = Math.round(MAIN_W_SCALAR * winWidth);
  var mainHeight = mainWidth;

  // have to account for aspect ratio.  
  if ( winWidth < winHeight )
  {
    mainWidth = Math.round(MAIN_W_SCALAR * winWidth * ( 1.0 + NUM_BARS/NUM_COLORS));
    CHOOSER_WIDTH = Math.round(mainWidth * 1.0/NUM_COLORS);
    mainWidth = CHOOSER_WIDTH * NUM_COLORS;
    mainHeight = mainWidth;
  }
  else
  {
    mainHeight = Math.round(MAIN_W_SCALAR * winHeight);
    mainWidth = Math.round(mainHeight * ( 1.0 + NUM_BARS/NUM_COLORS));
    CHOOSER_WIDTH = Math.round(mainHeight * 1.0/NUM_COLORS);
    mainHeight = CHOOSER_WIDTH * NUM_COLORS;
  }

  var whitespaceFudge = 0;   // ugh this varied based on font I used in h1...a,p,div, etc
  var contentWidth = mainWidth + NUM_BARS * CHOOSER_WIDTH + whitespaceFudge;
  var canvasIDWidth  = mainWidth;
  var canvasIDHeight = mainHeight;
  
  var barPlaceholderWidth  = CHOOSER_WIDTH;
  var barPlaceholderHeight = canvasIDHeight;
  var barMarginString = "0px " + whitespaceFudge + "px 0px -" + whitespaceFudge + "px";
  
  $(".main_body").css("width",  mainWidth);
  $(".main_content").css("width",  contentWidth);
  $(".main_content").css("height", mainHeight);

  $(".chooser").css("width",  CHOOSER_WIDTH);
  $(".chooser").css("height", CHOOSER_WIDTH);

  $(".buttonImg").css("width",  CHOOSER_WIDTH);
  $(".buttonImg").css("height", CHOOSER_WIDTH);
  
  $("#canvasID").css( {
    "width": canvasIDWidth, 
    "height": canvasIDHeight,
    "background" : "#333333" ,
    });
  $colorChooserBorder = Math.round(CHOOSER_WIDTH / COLOR_CHOOSER_BORDER_SCALAR);
  if ( $colorChooserBorder < 1 ) $colorChooserBorder = 1;

    
  $(".barPlaceholder").css( {
    "width": barPlaceholderWidth, 
    "height": barPlaceholderHeight,
    "background" : "#8866FF",
    "margin" : barMarginString
    });
    
    // put new width into global (context) for use in mouse position calcs etc
   $canvass = $("#canvasID");
   if( $canvass.length ) {
    $ctx = $canvass.get(0).getContext('2d');
    $ctx.canvas.width  = canvasIDWidth;
    $ctx.canvas.height = canvasIDHeight;
    $ctx.fillStyle = CANVAS_BRUSH_COLOR_INIT;
   }
   else 
    console.log('Error: Canvas not found with selector #canvas');

}    
