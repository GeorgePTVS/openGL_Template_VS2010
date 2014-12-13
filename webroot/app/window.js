function onWindowResize()
{
  var winWidth  = $( window ).width();
  var winHeight = $( window ).height();
  
  // set main_content width rel to window and height rel to width
  var MAIN_W_SCALAR = 0.8;
  var COLOR_CHOOSER_SCALAR = 0.05;
  var mainWidth  = Math.round(MAIN_W_SCALAR * winWidth);
  var mainHeight = mainWidth;

  var colorChooserWidth = Math.round(mainWidth * COLOR_CHOOSER_SCALAR);
  // have to account for aspect ratio.  
  if ( winWidth < winHeight )
  {
    mainWidth = Math.round(MAIN_W_SCALAR * winWidth + colorChooserWidth);
    mainHeight = mainWidth;
  }
  else
  {
    mainHeight = MAIN_W_SCALAR * winHeight;
    mainWidth = mainHeight + colorChooserWidth;
  }
  var whitespaceFudge = 0;   // ugh this varied based on font I used in h1...a,p,div, etc
  var negWhitespaceFudge = -1*whitespaceFudge;
  var contentWidth = mainWidth + colorChooserWidth + whitespaceFudge;
  var canvasPlaceholderWidth  = mainWidth;
  var canvasPlaceholderHeight = mainHeight - 50;
  
//  alert( "canvas wh = " + canvasPlaceholderWidth + " " + canvasPlaceholderHeight );

  var buttonBarPlaceholderWidth  = colorChooserWidth;
  var buttonBarPlaceholderHeight = canvasPlaceholderHeight;
  var buttonBarMarginString = "0px " + whitespaceFudge + "px 0px -" + whitespaceFudge + "px";
  
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
    "margin" : buttonBarMarginString
    });
    
    // put new width into global for use in mouse position calcs etc
   $canvass = $("#canvasPlaceholder");
//   console.log("New canvas wh = " + $canvass
   if( $canvass.length ) {
    $ctx = $("#canvasPlaceholder").get(0).getContext('2d');
    $ctx.canvas.width  = canvasPlaceholderWidth;
    $ctx.canvas.height = canvasPlaceholderHeight;

   }
   else 
    console.log('Error: Canvas not found with selector #canvas');

    
}    
