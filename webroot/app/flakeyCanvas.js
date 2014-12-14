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
  
  var defaults = {
    mode: 1,
    title: 'Awesome'
  };
  var shapeDefault = {
    mouseXY: { x:0, y:0 },
    scale: 1.0,
    color: '#440000',
    title: 'Awesome'
  };
  var $shapes = new Array( shapeDefault );
  console.log( "$shapes.length = " + $shapes.length + "... props: " + $shapes[0].mouseXY.x + " " + $shapes[0].mouseXY.y + " " + $shapes[0].scale + " " + $shapes[0].color + " " + $shapes[0].title );

  
  
  // // --------------------------
  // // -- Canvas classes
  // // -------------------------- 
// // http://jsperf.com/jquery-class-create-vs-pure-js-function/3  
// <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js">
// </script>
// <script src="http://digg.googlecode.com/files/Class-0.0.2.js">
// </script>
// <script src="//ajax.googleapis.com/ajax/libs/prototype/1/prototype.js"></script>
 
// <script>
  // Benchmark.prototype.setup = function() {
    // var result = '';
  // };
// </script>
  
  // var Animal = Class.create({
    // init: function(name, sound) {
      // this.name = name;
      // this.sound = sound;
    // },
    // speak: function() {
      // result = (this.name + " says: " + this.sound + "!");
    // }
  // });

  // var cat = new Animal('Kitty', 'Meow');
  // cat.speak();
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // $canvass and $ctx are defined in globals.js and are updated in window resizing
  
  
  // --------------------------
  // -- Canvas draw shape
  // --------------------------  
  function addShape()
  {
  }
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
  
  var $mouseXY = { x:0, y:0 };
  
  $canvass.on('click', function() {
    addShape();
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
