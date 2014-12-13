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
  
  // globals?
  var $textX = 50;
  var $textY = 50;

  // Cache elements
   $canvass = $("#canvasPlaceholder");
   // var $ctx;
   if( $canvass.length ) 
    $ctx = $("#canvasPlaceholder").get(0).getContext('2d');
   else 
    console.log('Error: Canvas not found with selector #canvas');
    
    console.log('Hi THere222 ctx = ' + $ctx);
    console.log('Hi THere444 canvass = ' + $canvass);

  // http://stackoverflow.com/questions/17343358/canvas-get-points-on-mouse-events
  // get mouse pos relative to canvas 
  // function getMousePos(canvas, evt) {
      // var rect = canvas.getBoundingClientRect();
      // return {
          // x: evt.clientX - rect.left,
          // y: evt.clientY - rect.top
      // };
  // }
  
      // // var x = e.pageX - this.offsetLeft;
      // // var y = e.pageY - this.offsetTop;

    function getMousePos(canvas, event)
    {
      // TODO scale or offset based on current canvas width/height; it is currently operating on wh at time of creation.
      // var mouseX = event.pageX - canvas.offset().left;
      // var mouseY = event.pageY - canvas.offset().top;
      var mouseX = event.clientX - canvas.offset().left;
      var mouseY = event.clientY - canvas.offset().top;
      console.log("epageXY " + event.pageX + " " + event.pageY + "  canvas.offset().left, Top: " + canvas.offset().left + " " + canvas.offset().top); 
      console.log("eClientxy " + event.clientX + " " + event.clientY + "  canvas.offset().left, Top: " + canvas.offset().left + " " + canvas.offset().top); 
      return {
          x: mouseX,
          y: mouseY };
    }  
  
  
  var x1, y1, x2, y2;     //to store the coords

  // when mouse button is clicked and held    
  // $('#myCanvas').on('mousedown', function(e){
      // if (isDown === false) {

          // isDown = true;

          // var pos = getMousePos(canvas, e);
          // x1 = pos.x;
          // y1 = pos.y;
      // }
  // });
    
  $canvass.on('click', function() {
    $(this).toggleClass('highlight');
    $ctx.fillRect(50, 25, 150, 100);
    // $ctx.
  });

  $canvass.on('mousemove', function(e) {
    var pos = getMousePos($canvass, e);
    x1 = pos.x;
    y1 = pos.y;
    // console.log( "x1 = " + x1 + ", y1 " + y1 );

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
