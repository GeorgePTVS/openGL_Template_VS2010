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


// put a solid border around color chooser during hover.  Have to manipulate size since border starts as 0.  
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

 
  // --------------------------
  // -- Canvas 
  // --------------------------  
  
  // globals?
  var $textX = 50;
  var $textY = 50;

  // $canvass and $ctx are defined in globals.js and are updated in window resizing
  
  
  // --------------------------
  // -- Canvas mouse
  // --------------------------  
  
  function getMousePos(canvas, event)
  {
    // can/should also use event.pageX, event.scrollX?  event.screenX?
    var mouseX = event.clientX - canvas.offset().left;
    var mouseY = event.clientY - canvas.offset().top;
    return {
        x: mouseX,
        y: mouseY };
  }  
  
//  var $mouseXY = { x:0, y:0 };
  var $mouseXY = { x:0, y:0 };
  
  $canvass.on('click', function() {
    $(this).toggleClass('highlight');
    $ctx.fillRect(50, 25, 150, 100);
  });

  $canvass.on('mousemove', function(e) {
    $mouseXY = getMousePos($canvass, e);
  });


  // -----------------------------------------
  // Canvas animation/draw loop
  // -----------------------------------------

    function update() {
    // animation update
      // could read mouse here. 
      // $textX += 2;
      // $textY += 2;
    }

    function clearCanvas() {
      $ctx.clearRect(0, 0, $canvass.width(), $canvass.height());  
    }
    
    function drawScene() {
    }

    function drawMouse() {
      $ctx.fillStyle = "#FFF";
      $ctx.fillText("Hello WWWorld!", $mouseXY.x, $mouseXY.y);
    }

    function draw() {
      clearCanvas();
      // drawScene();
      drawMouse();
    }

    var FPS = 30;
    setInterval(function() {
    // this is for timer-driven drawing. There is also event-driven (e.g. mousemove)
      update();
      draw();
    }, 1000/FPS);


});
