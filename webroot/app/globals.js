
// Global canvas elements.  Need access to them in window resize function so that pixel/mouse params are sized to new width/height.
// Cache elements
console.log("Global canvas elements");

var VERSION_NUMBER = "0.1.0";

var COLOR_CHOOSER_BORDER_SCALAR = 10;
var MAIN_W_SCALAR = 0.7;
var NUM_COLORS = 12;
var COLOR_CHOOSER_SCALAR = 0.05;
var CANVAS_BRUSH_COLOR_INIT = "#FFFFFF";
var NUM_BARS = 3;  
var CHOOSER_WIDTH = 30;
var BAR_PLACEHOLDER_COLOR = "#8866FF";
var BRUSH_SIZE_BASE = 20;
var BRUSH_SIZE_TOUCH_SCALAR = 0.001;
var BRUSH_SCALE_DELTA = 0.25;
var BRUSH_ROTATION_DELTA = 10;  // degrees
var ROTATE_DETENT = 10;  
var LINE_HEIGHT_SCALAR = 0.1;
var NUM_CIRCLE_SECTIONS = 12;

var HELP_TIMEOUT = 4000;
var helpTimeout;
var helpShowing = false;

var $canvass;
var $ctx;
var $colorChooserBorder = 5;  // px

var touchStartCount = 0;
var touchEndCount = 0;
var touchersCount = 0;  // number of fingers/things touching device.
var wasMultitouching = false;
var scaleDistanceBaseline = 1.0;  // not sure of units.  
var angleBaseline = 0.0;
var rad3Over2 = 0.8660254;

var MOUSE_TIMEOUT = 2500;
var usingMouse = false;
var mouseTimeout;

var undoRepeatVar;
var redoRepeatVar;
var UNDO_REPEAT_TIMEOUT = 100;
var REDO_REPEAT_TIMEOUT = UNDO_REPEAT_TIMEOUT;


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
var $shapesUndo = [];
var $brushShape = jQuery.extend(true, {}, $shape);
$brushShape.color = CANVAS_BRUSH_COLOR_INIT;
$brushShape.scale    = 1.0;
$brushShape.rotation = 0.0;


