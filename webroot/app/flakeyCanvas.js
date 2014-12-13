$(document).ready(function(){
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  
  // --------------------------
  // -- Color chooser
  // --------------------------  
  $(".colorChooserDiv").on('click', function() {

  var newColor = $(this).css("background-color");
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

 console.log('Hi THere')
 
  // --------------------------
  // -- Canvas 
  // --------------------------  
  
  // Cache elements
   var $canvass = $("#canvasPlaceholder");
   var $ctx;
   if( $canvass.length ) 
    $ctx = $("#canvasPlaceholder").get(0).getContext('2d');
   else 
    console.log('Error: Canvas not found with selector #canvas');
    
    console.log('Hi THere222 ctx = ' + $ctx);
    console.log('Hi THere444 canvass = ' + $canvass);
    
  $canvass.on('click', function() {
    $(this).toggleClass('highlight');
    $ctx.fillRect(50, 25, 150, 100);
    // $ctx.
  });



  // -----------------------------------------
  // animation/draw loop
  // -----------------------------------------
    var textX = 50;
    var textY = 50;

    function update() {
      textX += 2;
      textY += 2;
    }

    function clearCanvas() {
      $ctx.clearRect(0, 0, $canvass.width(), $canvass.height());  
      // console.log("$canvass.width, $canvass.height = "+ $canvass.width() + "  " + $canvass.height() );
    }
    
    function draw() {
      clearCanvas();
      $ctx.fillStyle = "#FFF";
      $ctx.fillText("Hello World!", textX, textY);
    }

    var FPS = 30;
    setInterval(function() {
      update();
      draw();
    }, 1000/FPS);


});
