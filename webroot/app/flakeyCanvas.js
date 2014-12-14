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
    // $("#yellow").css("background-color", newColor);
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
  // -- Canvas
  // --------------------------

  // globals?
  var $textX = 50;
  var $textY = 50;

  var defaults = {
    mode : 1,
    title : 'Awesome'
  };

  // --------------------------
  // -- Canvas "classes"
  // --------------------------
  // use this as the prototype for all shapes, just changing properties on it and doing $shapes.push(shape) to add a new one (e.g. in click), and .pop to remove.
  var shape = {
    mouseXY : {
      x : 0,
      y : 0
    },
    scale : 1.0,
    color : '#440000',
    title : 'Awesome',
    type : 'square'
  };
  
  var $shapes = [];
  
  // $shapes.push( shape );
  // $shapes.push(shape);
  // for (var i = 0; i < $shapes.length; i++) {
    // console.log("$shapes.length = " + $shapes.length + "... props: " + $shapes[i].mouseXY.x + " " + $shapes[i].mouseXY.y + " " + $shapes[i].scale + " " + $shapes[i].color + " " + $shapes[i].title + " " + $shapes[i].type);
  // }



  // $canvass and $ctx are defined in globals.js and are updated in window resizing


  // --------------------------
  // -- Canvas draw shape
  // --------------------------
  function addShape(mouseXY) {
    // var shapeNew = shape;
    // // Deep copy
    // var newObject = jQuery.extend(true, {}, oldObject);
    // Deep copy
    var shapeNew = jQuery.extend(true, {}, shape);
    shapeNew.mouseXY = mouseXY;
    console.log("addShape  color = " + $brushColor );
    shapeNew.color = $brushColor;
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
    console.log("click, adding shape");
    addShape(getMousePos($canvass, e));
    // for (var i = 0; i < $shapes.length; i++) {
      // console.log("i = " + i  + ", $shapes.length = " + $shapes.length + "... props: " + $shapes[i].mouseXY.x + " " + $shapes[i].mouseXY.y + " " + $shapes[i].scale + " " + $shapes[i].color + " " + $shapes[i].title + " " + $shapes[i].type);
    // }
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
    // $textX += 2;
    // $textY += 2;
  }

  function clearCanvas() {
    $ctx.clearRect(0, 0, $canvass.width(), $canvass.height());
  }

  function drawScene() {
    var centerX = $ctx.canvas.width / 2;
    var centerY = $ctx.canvas.height / 2;
    $ctx.translate(centerX, centerY);
    for (var flakeRot = 0; flakeRot < 6; flakeRot++) {
      // translate context to center of canvas
      // console.log("$canvass.weight = " + $canvass.width + " "  + $canvass.height );
      // $ctx.translate($canvass.width / 2, $canvass.height / 2);
      // rotate 45 degrees clockwise
      $ctx.rotate(Math.PI / 3);
      for (var i = 0; i < $shapes.length; i++) {
        var start = $shapes[i].mouseXY;
        var size = 10;
        var color = $shapes[i].color;
        $ctx.fillStyle = color;
        $ctx.fillRect(start.x - centerX, start.y - centerY, size, size);
        // console.log("i = " + i  + ", $shapes[i].color = " + $shapes[i].color + "... props: " + $shapes[i].mouseXY.x + " " + $shapes[i].mouseXY.y + " " + $shapes[i].scale + " " + $shapes[i].color + " " + $shapes[i].title + " " + $shapes[i].type);
        //console.log("i = " + i  + ", $shapes.length = " + $shapes.length + "... props: " + $shapes[i].mouseXY.x + " " + $shapes[i].mouseXY.y + " " + $shapes[i].scale + " " + $shapes[i].color + " " + $shapes[i].title + " " + $shapes[i].type);
      } // shapes
    } // flakeRot
    // translate context from center of canvas
    $ctx.translate(-centerX, -centerY);
  }
  function drawMouse() {
    // $ctx.fillText("Hello WWWorld!", $mouseXY.x, $mouseXY.y);
    var start = $mouseXY;
    var size = 10;
    $ctx.fillStyle = $brushColor;
    $ctx.fillRect(start.x, start.y, size, size);
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
 