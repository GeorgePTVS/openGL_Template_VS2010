
// Global canvas elements.  Need access to them in window resize function so that pixel/mouse params are sized to new width/height.
// Cache elements
console.log("Global canvas elements");
var COLOR_CHOOSER_BORDER_SCALAR = 10;
var MAIN_W_SCALAR = 0.8;
var COLOR_CHOOSER_SCALAR = 0.05;


var $canvass;
var $ctx;
var $colorChooserBorder = 5;  // px
var $brushColor = "#0000ff";
