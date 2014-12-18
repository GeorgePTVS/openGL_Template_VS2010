
// Global canvas elements.  Need access to them in window resize function so that pixel/mouse params are sized to new width/height.
// Cache elements
console.log("Global canvas elements");
var COLOR_CHOOSER_BORDER_SCALAR = 10;
var MAIN_W_SCALAR = 0.8;
var COLOR_CHOOSER_SCALAR = 0.05;
var CANVAS_BRUSH_COLOR_INIT = "#FFFFFF";
var BRUSH_SIZE_BASE = 20;
var BRUSH_SIZE_TOUCH_SCALAR = 0.001;
var BRUSH_SCALE_DELTA = 0.25;
var BRUSH_ROTATION_DELTA = 10;  // degrees

var $canvass;
var $ctx;
var $colorChooserBorder = 5;  // px
var $brushColor = CANVAS_BRUSH_COLOR_INIT;
var $brushScale    = 1.0;
var $brushRotation = 0.0;

var touchStartCount = 0;
var touchEndCount = 0;
var touchersCount = 0;  // number of fingers/things touching device.
var wasMultitouching = false;
var scaleDistanceBaseline = 1.0;  // not sure of units.  

// use this as the prototype for all shapes, just changing properties on it and doing $shapes.push(shape) to add a new one (e.g. in click), and .pop to remove.
var $shape = {
  mouseXY : {
    x : 0,
    y : 0
  },
  scale : 1.0,
  rotation : 0.0,
  color : '#440000',
  title : 'Awesome',
  type : 'square'
};
  
var $shapes = [];
