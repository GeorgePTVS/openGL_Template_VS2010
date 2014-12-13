$(document).ready(function(){
  
  $(window).resize(onWindowResize );
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
    // var $colorChooserBorder = 5;  // px
    var oldWidth  = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width",  oldWidth  - $colorChooserBorder*2);
    $(this).css("height", oldHeight - $colorChooserBorder*2);
    $(this).css("border", $colorChooserBorder + "px solid gray");
  }, function() {
    // var $colorChooserBorder = 5;  // px
    var oldWidth  = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width",  oldWidth  + $colorChooserBorder*2);
    $(this).css("height", oldHeight + $colorChooserBorder*2);
    $(this).css("border", "0");
  }
 );  

 console.log('Hi THere')
 
  // --------------------------
  // -- Canvas 
  // --------------------------  
  
  // globals?
  var $textX = 50;
  var $textY = 50;

  // $canvass and $ctx are defined in globals.js and are updated in window resizing
   
  function getMousePos(canvas, event)
  {
    // var mouseX = event.pageX - canvas.offset().left;
    // var mouseY = event.pageY - canvas.offset().top;
    var mouseX = event.clientX - canvas.offset().left;
    var mouseY = event.clientY - canvas.offset().top;
    // console.log("epageXY " + event.pageX + " " + event.pageY + "  canvas.offset().left, Top: " + canvas.offset().left + " " + canvas.offset().top); 
    // console.log("eClientxy " + event.clientX + " " + event.clientY + "  canvas.offset().left, Top: " + canvas.offset().left + " " + canvas.offset().top); 
    return {
        x: mouseX,
        y: mouseY };
  }  
  
  
  var x1, y1, x2, y2;     //to store the coords

  $canvass.on('click', function() {
    $(this).toggleClass('highlight');
    $ctx.fillRect(50, 25, 150, 100);
  });

  $canvass.on('mousemove', function(e) {
    var pos = getMousePos($canvass, e);
    x1 = pos.x;
    y1 = pos.y;

    clearCanvas();
    $ctx.fillStyle = "#FFF";
    $ctx.fillText("Hello World!", x1, y1);

  });


  // -----------------------------------------
  // animation/draw loop
  // -----------------------------------------

    function update() {
      // could read mouse here. 
      // $textX += 2;
      // $textY += 2;
    }

    function clearCanvas() {
      $ctx.clearRect(0, 0, $canvass.width(), $canvass.height());  
      // console.log("$canvass.width, $canvass.height = "+ $canvass.width() + "  " + $canvass.height() );
    }
    
    function draw() {
      // clearCanvas();
      // $ctx.fillStyle = "#FFF";
      // $ctx.fillText("Hello World!", $textX, $textY);
    }

    var FPS = 30;
    setInterval(function() {
      update();
      draw();
    }, 1000/FPS);


});
