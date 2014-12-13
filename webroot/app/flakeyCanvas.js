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
     alert('$canvas click');
  });
  // canvass.on('mousemove', function() {
    // $(this).toggleClass('highlight');
    // //alert('mousemove');
  // });
    
         // var canvas = $("#canvasPlaceholder").get(0);
      // // var ctx = $("#theCanvas").get(0).getContext("2d");
      // var context = canvas.get(0).getContext('2d');

      // $("#canvasPlaceholder").on("mousemove", function(evt){
//      $("#canvasPlaceholder").hover(function(){
      // $("#canvasPlaceholder").on("click", function(){
      // $(".canvasTest").get(0).on("click", function(){
      // ctx.on("click", function(){
      // alert("Hi");
      // // canvas.addEventListener('mousemove', function(evt) {
        // // var mousePos = getMousePos(canvas, evt);
        // // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        // // writeMessage(canvas, message);
      // }, false);

// ------------------------------------------------
// -- Canvas 
// ------------------------------------------------
      // function writeMessage(canvas, message) {
        // var context = canvas.getContext('2d');
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.font = '18pt Calibri';
        // context.fillStyle = 'black';
        // context.fillText(message, 10, 25);
      // }
      // function getMousePos(canvas, evt) {
        // var rect = canvas.getBoundingClientRect();
        // return {
          // x: evt.clientX - rect.left,
          // y: evt.clientY - rect.top
        // };
      // }
      // var canvas = document.getElementById('myCanvas');
      // var context = canvas.getContext('2d');
      // var canvas = $("#canvasPlaceholder");
      // // var ctx = $("#theCanvas").get(0).getContext("2d");
      // var context = canvas.get(0).getContext('2d');

      // canvas.on("mousemove", function(evt){
      // alert("Hi");
      // // canvas.addEventListener('mousemove', function(evt) {
        // // var mousePos = getMousePos(canvas, evt);
        // // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        // // writeMessage(canvas, message);
      // }, false);




});
