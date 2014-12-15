$(document).ready(function () {

  $(window).resize(onWindowResize);
  onWindowResize();

  // --------------------------
  // -- Color chooser
  // --------------------------
  $(".colorChooserDiv").on('click', function () {

    var newColor = $(this).css("background-color");
    $brushColor = newColor;
    console.log("button click  color = " + $brushColor );
  });
  
  // put a solid border around color chooser during hover.  Have to manipulate size since border starts as 0.
  $(".colorChooserDiv").hover(
    // TODO Use addClass removeClass (or toggleClass) in each of these fns)
    function () {
    // var $colorChooserBorder = 5;  // px
    var oldWidth = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width", oldWidth - $colorChooserBorder * 2);
    $(this).css("height", oldHeight - $colorChooserBorder * 2);
    $(this).css("border", $colorChooserBorder + "px solid gray");
  }, function () {
    // var $colorChooserBorder = 5;  // px
    var oldWidth = $(this).width();
    var oldHeight = $(this).height();
    $(this).css("width", oldWidth + $colorChooserBorder * 2);
    $(this).css("height", oldHeight + $colorChooserBorder * 2);
    $(this).css("border", "0");
  });

  
  
  // --------------------------
  // -- Brush
  // --------------------------
  // var $shiftKeyDown = false;
  // $(window).on('keydown', function(event){
    // if (event.which == 16) 
      // $shiftKeyDown = true;
      // console.log("Shift key pressed" );
      // } );
  // $(window).on('keyup', function(event){
    // if (event.which == 16) 
      // $shiftKeyDown = false;
      // console.log("Shift key released" );
      // } );
  


  // http://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery
  $(window).bind('wheel DOMMouseScroll', function(event){
    // (mouse)wheel event
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
      // wheel up
      if ( event.shiftKey ) 
      {
        // scale
        $brushScale += BRUSH_SCALE_DELTA;
        console.log("wheel up. new brushScale = " + $brushScale);
      } 
      else 
      {
        // rotate
        $brushRotation += BRUSH_ROTATION_DELTA;
        console.log("wheel up. new brushRotation = " + $brushRotation);
      }
    }
    else {
      // wheel down
      if ( event.shiftKey ) 
      {
        // scale
        $brushScale -= BRUSH_SCALE_DELTA;
        console.log("wheel down. new brushScale = " + $brushScale);
      }
      else 
      {
        // rotate
        $brushRotation -= BRUSH_ROTATION_DELTA;
        console.log("wheel down. new brushRotation = " + $brushRotation);
      }
    }  // else of wheelDelta etc
  });
  // --------------------------
  // -- Canvas
  // --------------------------

  // --------------------------
  // -- Canvas "classes"
  // --------------------------



  // $canvass and $ctx are defined in globals.js and are updated in window resizing


  // --------------------------
  // -- Canvas draw $shape
  // --------------------------
  function addShape(mouseXY) {
    // var shapeNew = $shape;
    // // Deep copy
    // var newObject = jQuery.extend(true, {}, oldObject);
    // Deep copy
    var shapeNew = jQuery.extend(true, {}, $shape);
    shapeNew.mouseXY = mouseXY;
    console.log("addShape  color = " + $brushColor );
    shapeNew.color = $brushColor;
    shapeNew.scale = $brushScale;
    shapeNew.rotation = $brushRotation;
    $shapes.push( shapeNew );   
  }
  
  
  // --------------------------
  // -- Canvas mouse
  // --------------------------

  function getMousePos(canvas, event) {
    // can/should also use event.pageX, event.scrollX?  event.screenX?
    var mouseX = event.clientX - canvas.offset().left;
    var mouseY = event.clientY - canvas.offset().top;
    return {
      x : mouseX,
      y : mouseY
    };
  }

  var $mouseXY = {
    x : 0,
    y : 0
  };

  $canvass.on('click', function (e) {
    console.log("click, adding $shape");
    addShape(getMousePos($canvass, e));
  });

  $canvass.on('mousemove', function (e) {
    $mouseXY = getMousePos($canvass, e);
  });

  // -----------------------------------------
  // Canvas animation/draw loop
  // -----------------------------------------

  function update() {
    // animation update
    // could read mouse here.
  }

  function clearCanvas() {
    $ctx.clearRect(0, 0, $canvass.width(), $canvass.height());
  }

  function drawScene() {
    // translate context to center of canvas
    var centerX = $ctx.canvas.width / 2;
    var centerY = $ctx.canvas.height / 2;
    $ctx.save();
    
    // repeat each shape 6 times around the center
    for (var flakeRot = 0; flakeRot < 6; flakeRot++) {
      // rotate 1/6 of a rotation clockwise
      // tricky: 0, 0 is in upper left.  have to draw, then move back from middle of canvas to 0, 0, then rotate 60 degrees then move back out. 
      // order of ops is like OpenGL: those closest to drawing happen first.
      $ctx.translate(centerX, centerY);  // move back out
      $ctx.rotate(Math.PI / 3);          // rotate 60 degs
      $ctx.translate(-centerX, -centerY);// move from middle of canvas to 0,0 upper left
      // draw
      for (var i = 0; i < $shapes.length; i++) {
        var start = $shapes[i].mouseXY;
        var size = BRUSH_SIZE_BASE;
        var color = $shapes[i].color;
        $ctx.fillStyle = color;

        $ctx.save();
        // rotate about current mouse position: Transform to origin, rotate, then transform back to position.
        $ctx.translate( start.x, start.y );
        $ctx.rotate( Math.PI * $shapes[i].rotation / 180.0 );
        $ctx.scale( $shapes[i].scale, $shapes[i].scale );
        $ctx.fillRect(0 - size/2, 0 - size/2, size, size);
        $ctx.restore();

      } // shapes

    } // flakeRot

    $ctx.restore();
    
  }

  function drawMouse() {
    var start = $mouseXY;
    var size = BRUSH_SIZE_BASE;
    $ctx.fillStyle = $brushColor;

    $ctx.save();
    // rotate about current mouse position: Transform to origin, rotate, then transform back to position.
    $ctx.translate( $mouseXY.x, $mouseXY.y );
    $ctx.rotate( Math.PI * $brushRotation / 180.0 );
    $ctx.scale( $brushScale, $brushScale );
    $ctx.fillRect(0 - size/2, 0 - size/2, size, size);
    $ctx.restore();
    
    }
    
    
  function draw() {
    clearCanvas();
    drawScene();
    drawMouse();
  }

  var FPS = 40;
  setInterval(function () {
    // this is for timer-driven drawing. There is also event-driven (e.g. mousemove)
    update();
    draw();
  }, 1000 / FPS);

});
 