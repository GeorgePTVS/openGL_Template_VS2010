// remove splash screen from XDK emulator. Not sure of effect in real app.
document.addEventListener("intel.xdk.device.ready",function(){ intel.xdk.device.hideSplashScreen(); },false);

$(document).ready(function(){
  // alert('Document Ready' );
  //alert('Document Ready. winWidth = ' + winWidth + ' winHeight = ' + winHeight + ' mainWidth; ' + mainWidth + ' mainHeight: ' + mainHeight);
  
  $(window).resize(onWindowResize);
  onWindowResize();  
  $("button").on('click', function() {
  alert("Hello World");
  } );

});