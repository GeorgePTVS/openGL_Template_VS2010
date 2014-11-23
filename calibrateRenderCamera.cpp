// I based flakey on some glut examples.  The following author provided the primary example of glut infrastructure. Thank you Mitch Richling.
// I used freeglut instead of glut though.
// gcp Nov 22, 2014
//
/* -*- Mode:C; Coding:us-ascii-unix; fill-column:132 -*- */
/**********************************************************************************************************************************/
/**
   @file      interact.c
   @author    Mitch Richling <http://www.mitchr.me/>
   @Copyright Copyright 1997 by Mitch Richling.  All rights reserved.
   @brief     How to get input and process it with GLUT.@EOL
   @Keywords  input mouse keyboard glut
   @Std       C99

   This little program demonstrates how to get input from the keyboard and detect various mouse events.  Also demonstrated are
   several callbacks: display callback, timer callbacks, and the idle callback.
***********************************************************************************************************************************/

/**********************************************************************************************************************************/
#include <stdio.h>              /* I/O lib         ISOC  */
#include <stdlib.h>             /* Standard Lib    ISOC  */
#include <vector>

/**********************************************************************************************************************************/
/* Apple puts GLUT into a framework named GLUT, while the rest of the world just sticks GLUT into the GL include directory... */
#ifdef __APPLE__
#include <GLUT/glut.h>          /* Open GL Util    APPLE */
#else
#include <GL/freeglut.h>            /* Open GL Util    OpenGL*/
#endif

/**********************************************************************************************************************************/
using namespace std;


static float eangle = 0.0;
static float eangleDelta = 0.5;
int mainWindow;

static const int WINDOW_WIDTH  = 500;
static const int WINDOW_HEIGHT = 500;

static const int MOUSE_IDLE_TIMER_CONST_MSEC = 3000;  
static const int ANIMATAION_TIMER_CONST_MSEC = 30;
static const int NUM_FLAKE_BLADES = 6;

static const float BRUSH_SIZE = 15.f/WINDOW_WIDTH;  // assuming square window for now

static const float LINE_HEIGHT_SCALAR = 0.1f;
static const int NUM_CIRCLE_SECTIONS = 12;

static int mouseX = 100;
static int mouseY = 200;
static int prevMouseX = 100;
static int prevMouseY = 200;
static bool mouseActive = true;

static float mouseRotZ = 0.f;
static const float MOUSE_ROT_DELTA = 3.f;  // degrees
static float mouseScale = 1.0f;
static const float MOUSE_SCALE_DELTA = 0.1f;
static bool useMultiMouse = true;

enum ShapeType
{
  SHAPE_SQUARE = 0,
  SHAPE_TRIANGLE,
  SHAPE_CIRCLE,
  SHAPE_LINE,
  SHAPE_SCALENE,
  SHAPE_COUNT
};

static ShapeType mouseShape = SHAPE_SQUARE;

enum ColorType
{
  COLOR_RED = 0,
  COLOR_GREEN,
  COLOR_BLUE,
  COLOR_MAGENTA,
  COLOR_YELLOW,
  COLOR_CYAN,
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_ERASE,
  COLOR_COUNT
};

static ColorType drawColorEnum = COLOR_WHITE;
typedef struct ShapeDef
{
  float x;
  float y;
  float scale;
  float rotZ;
  ShapeType shapeType;
  ColorType drawColorEnum;
  ShapeDef()
  {
    x = 0.f;
    y = 0.f;
    scale = 1.f;
    rotZ = 0.f;
    shapeType = mouseShape;
    drawColorEnum = COLOR_WHITE;
  }

} Shape;

static vector<Shape> shapeVector;



void mouseWheel( int _dir, int _shift );
void init();
void close();
void drawMouse();
void addShape( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum );
void drawTriangle( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum );
void drawSquare( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum );
void drawLine( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum );
void drawCircle( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum );
void drawScalene(float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum);
void screenToOrtho( float& _screenX, float& _screenY );
void setColor( ColorType _drawColorEnum );

/**********************************************************************************************************************************/
void displayCall() {
 
  // vary the background color over time.
  static const float redColorIncrement = 0.001f;
  static const float greenColorIncrement = 0.0012f;
  static const float blueColorIncrement = -0.001f;
  static float redClear = 0.0f;
  static float greenClear = 0.2f;
  static float blueClear = 0.8f;
  glClearColor(redClear,greenClear,blueClear,1);

  redClear = redClear + redColorIncrement;
  if ( redClear > 1.0f ) redClear = 0.f;
 
  greenClear = greenClear + greenColorIncrement;
  if ( greenClear > 1.0f ) greenClear = 0.f;

  blueClear = blueClear + blueColorIncrement;
  if ( blueClear > 1.0f ) blueClear = 0.f;
  if ( blueClear < 0.0f ) blueClear = 1.0f;

  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'H');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'e');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'l');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'l');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'o');

  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'D');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'a');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'n');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, 'e');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, '!');
  //glutStrokeCharacter(GLUT_STROKE_ROMAN, '!');



	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  glDisable(GL_DEPTH_TEST);

  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);

  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();


  // We are drawing snowflakes!
  // draw the (same) design on each of the (presumably 6) snowflake blades
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();

  glColor3f(1.f, 0.f, 0.f);
  float rotAngle = 360.f/NUM_FLAKE_BLADES;
  for ( unsigned int s = 0; s < shapeVector.size(); s++ )
  {
    for (int i = 0; i < NUM_FLAKE_BLADES; i++ )
    {
      glRotatef( rotAngle, 0.f, 0.f, 1.f);
      switch ( shapeVector[s].shapeType )
      {
      case (SHAPE_TRIANGLE):
        drawTriangle( shapeVector[s].x, shapeVector[s].y, shapeVector[s].rotZ, shapeVector[s].scale, shapeVector[s].drawColorEnum );
        break;
      case (SHAPE_LINE):
        drawLine( shapeVector[s].x, shapeVector[s].y, shapeVector[s].rotZ, shapeVector[s].scale, shapeVector[s].drawColorEnum );
        break;
      case (SHAPE_CIRCLE):
        drawCircle( shapeVector[s].x, shapeVector[s].y, shapeVector[s].rotZ, shapeVector[s].scale, shapeVector[s].drawColorEnum );
        break;
      case (SHAPE_SCALENE):
        drawScalene( shapeVector[s].x, shapeVector[s].y, shapeVector[s].rotZ, shapeVector[s].scale, shapeVector[s].drawColorEnum );
        break;
      default:
      case (SHAPE_SQUARE):
        drawSquare( shapeVector[s].x, shapeVector[s].y, shapeVector[s].rotZ, shapeVector[s].scale, shapeVector[s].drawColorEnum );
        break;
      }

    }  // for (int i = 0; i < NUM_FLAKE_BLADES; i++ )

// #define DRAW_TEST_SHAPES
#ifdef DRAW_TEST_SHAPES
    glBegin(GL_QUADS);
    glVertex2f( -0.5f,  0.2f );
    glVertex2f( -0.3f,  0.2f );
    glVertex2f( -0.3f,  0.f );
    glVertex2f( -0.5f,  0.f );
    glEnd();
#endif  // DRAW_TEST_SHAPES


  }  // for ( unsigned int s = 0; s < shapeVector.size(); s++ )

  // draw mouse with shape. 
  glFlush();  // flush first so mouse is on top. hmm that's no guarantee.

  if ( mouseActive ) 
  {
    if ( useMultiMouse )
    {
      glMatrixMode(GL_MODELVIEW);
      glLoadIdentity();
      for (int i = 0; i < NUM_FLAKE_BLADES; i++ )
      {
        glRotatef( rotAngle, 0.f, 0.f, 1.f);
        drawMouse();
      }
    }
    else
    {
      drawMouse();
    }
  } // if drawMouse

  glutSwapBuffers();
} /* end func displayCall */

/**********************************************************************************************************************************/
/* Called when a key is released... */
void keyboardUpCall(unsigned char key, int x, int y) {
} /* end func keyboardUpCall */

/**********************************************************************************************************************************/
/* Key presses */
void keyboardCall(unsigned char key, int x, int y) {
  char *m;
  int kbMod;
  /* Can only be called during mouse callback or kbd callback. */
  kbMod = glutGetModifiers();
  if(kbMod == GLUT_ACTIVE_SHIFT) {
    m = "SHIFT";
  } else if(kbMod == GLUT_ACTIVE_CTRL) {
    m = "CTRL";
  } else if(kbMod == GLUT_ACTIVE_ALT) {
    m = "ALR";
  } else {
    m = "NONE";
  } /* end if */
  printf("KEY: %c with mod: %s\n", key, m);

  // ESC or q is quit
  if( (key == 'q') || (key == 0x1B)) 
  {
    close();
  }
  else if ( key == 's' )
  {
    mouseShape = static_cast<ShapeType>(static_cast<int>(mouseShape) + 1);
    mouseShape = static_cast<ShapeType>(static_cast<int>(mouseShape) % SHAPE_COUNT); 
    printf("mouseShape = %d\n", mouseShape );
  }
  else if ( key == '1' )
  {
    drawColorEnum = COLOR_RED;
  }
  else if ( key == '2' )
  {
    drawColorEnum = COLOR_GREEN;
  }
  else if ( key == '3' )
  {
    drawColorEnum = COLOR_BLUE;
  }
  else if ( key == '4' )
  {
    drawColorEnum = COLOR_MAGENTA;
  }
  else if ( key == '5' )
  {
    drawColorEnum = COLOR_YELLOW;
  }
  else if ( key == '6' )
  {
    drawColorEnum = COLOR_CYAN;
  }
  else if ( key == '8' )
  {
    drawColorEnum = COLOR_WHITE;
  }
  else if ( key == '9' )
  {
    drawColorEnum = COLOR_BLACK;
  }
  else if ( key == '0' )
  {
    drawColorEnum = COLOR_ERASE; 
  }

} /* end func keyboardCall */

/**********************************************************************************************************************************/
/* Special Key presses */
void specialCall(int key, int x, int y) {
  if       (key == GLUT_KEY_F1       ) { printf("KEY: F1        ");
  } else if(key == GLUT_KEY_F2       ) { printf("KEY: F2        ");
  } else if(key == GLUT_KEY_F3       ) { printf("KEY: F3        ");
  } else if(key == GLUT_KEY_F4       ) { printf("KEY: F4        ");
  } else if(key == GLUT_KEY_F5       ) { printf("KEY: F5        ");
  } else if(key == GLUT_KEY_F6       ) { printf("KEY: F6        ");
  } else if(key == GLUT_KEY_F7       ) { printf("KEY: F7        ");
  } else if(key == GLUT_KEY_F8       ) { printf("KEY: F8        ");
  } else if(key == GLUT_KEY_F9       ) { printf("KEY: F9        ");
  } else if(key == GLUT_KEY_F10      ) { printf("KEY: F10       ");
  } else if(key == GLUT_KEY_F11      ) { printf("KEY: F11       ");
  } else if(key == GLUT_KEY_F12      ) { printf("KEY: F12       ");
  } else if(key == GLUT_KEY_LEFT     ) { printf("KEY: LEFT      ");
  } else if(key == GLUT_KEY_UP       ) { printf("KEY: UP        ");
  } else if(key == GLUT_KEY_RIGHT    ) { printf("KEY: RIGHT     ");
  } else if(key == GLUT_KEY_DOWN     ) { printf("KEY: DOWN      ");
  } else if(key == GLUT_KEY_PAGE_UP  ) { printf("KEY: PAGE_UP   ");
  } else if(key == GLUT_KEY_PAGE_DOWN) { printf("KEY: PAGE_DOWN ");
  } else if(key == GLUT_KEY_HOME     ) { printf("KEY: HOME      ");
  } else if(key == GLUT_KEY_END      ) { printf("KEY: END       ");
  } else if(key == GLUT_KEY_INSERT   ) { printf("KEY: INSERT    ");
  } else                               { printf("KEY: UNKNOWN   ");
  }
  printf("AT: (%d,%d)\n", x, y);
} /* end func specialCall */

/**********************************************************************************************************************************/
/* Mouse clicks */
void mouseCall(int button, int state, int x, int y) {

  printf("MouseCall\n");
  char *b, *m;
  int kbMod;

  if       (button == GLUT_LEFT_BUTTON)   {  /* MacOS X: Ctr-Click */
    b = "left button";
  } else if(button == GLUT_MIDDLE_BUTTON) {  /* MacOS X: Opt-Click */
    b = "middle button";
  } else if(button == GLUT_RIGHT_BUTTON)  {  /* MacOS X: Click */
    b = "right button";
  } else {
    b = "unknown";
  } /* end if/else */

  /* Can only be called during mouse callback or kbd callback.  Note that menu binding will capture clicks before they get here.
     Also note that on some platforms, MacOS X, mouse buttons may be emulated with various combinations of keys and the single mouse
     button -- so ctrl-click and alt-click may not be possible.  Shift-click is almost always possible.*/
  kbMod = glutGetModifiers();
  if(kbMod == GLUT_ACTIVE_SHIFT) {
    m = "SHIFT";
  } else if(kbMod == GLUT_ACTIVE_CTRL) {
    m = "CTRL";
  } else if(kbMod == GLUT_ACTIVE_ALT) {
    m = "ALR";
  } else {
    m = "NONE";
  } /* end if/else */

  if(state == GLUT_DOWN) {
    printf("Mouse Depress: b(%s/%d/%s)@(%d,%d)\n", b, button, m, x, y);

    if ( button == GLUT_LEFT_BUTTON )
    {
      float screenX = (float)x;
      float screenY = (float)y;
      screenToOrtho( screenX, screenY );
      addShape( screenX, screenY, mouseRotZ, mouseScale, drawColorEnum );
    }

  } else if(state == GLUT_UP) {
    printf("Mouse Release: b(%s/%d/%s)@(%d,%d)\n", b, button, m, x, y);
  } else {
    printf("Unknown Mouse Click Event: b(%d/%s)@(%d,%d)\n", button, m, x, y);
  } /* end if/else */

  // these control numbers were determined empirically from printf's
  if ( button == 3 )
  {
    int up = 1;
    int noShift = 0;
    mouseWheel( up, noShift );
  }
  else if ( button == 4 )
  {
    int down = 0;
    int noShift = 0;
    mouseWheel( down, noShift );
  }
  else if ( button == 11 ) 
  {
    int up = 1;
    int shift = 1;
    mouseWheel( up, shift );
  }
  else if ( button == 12 )
  {
    int down = 0;
    int shift = 1;
    mouseWheel( down, shift );
  }
}  /* end func mouseCall */

/**********************************************************************************************************************************/
/* Mouse move with button press */
void motionCall(int x, int y) {
  static int notInit;
  static int oldX;
  static int oldY;
  if(notInit) {
    printf("MOTION: (%d,%d) -> (%d,%d)\n", oldX, oldY, x, y);  
    oldX = x;
    oldY = y;
  } else {
    printf("MOTION: (%d,%d)\n", x, y);  
    oldX = x;
    oldY = y;
    notInit = 1;
  } /* end if/else */
} /* end func motionCall */

/* Mouse move with button press */
void joystickCall(unsigned int buttonMask, int x, int y, int z) {
  printf("JOYSTICK: %ud @ (%d,%d,%d)\n", buttonMask, x, y, z);
} /* end func joystickCall */

/*  Spaceball translation.. Passive. x, y, and z are normalized to [-1000,1000]*/
void spaceballMotionCall(int x, int y, int z) {
  printf("SPACEBALL TRN: (%d,%d,%d)\n", x, y, z);
} /* end func spaceballMotionCall */

/*  Spaceball translation.. Passive. x, y, and z are normalized to [-1000,1000]*/
void spaceballRotateFunc(int x, int y, int z) {
  printf("SPACEBALL ROT: (%d,%d,%d)\n", x, y, z);
} /* end func spaceballRotateFunc */

/**********************************************************************************************************************************/
/*  What to do for spaceball buttons.. */
void spaceballButtonFunc(int button, int state) {
  printf("SPACEBALL BUTTONS:  Button: %d    State: %d\n", button, state);
} /* end func spaceballButtonFunc */

/**********************************************************************************************************************************/
void menuCall(int value) {
  printf("MENU: %d\n", value);
  if       (value == 20) {
    eangle = 0;
  } else if(value == 21) {
  } else if(value == 10) {
    glutPostRedisplay();
  } else if(value == 11) {
    glutDestroyWindow(mainWindow);
    exit(0);
  } else if(value == 0) {
    printf("Hello to you too!!");
  } /* end if/else */
} /* end func menuCall */

/**********************************************************************************************************************************/
void passiveMotionCall(int x, int y) { 
  printf("PASSIVE MOTION: (%d,%d)\n", x, y);  
  mouseX = x;
  mouseY = y;
  mouseActive = true;
  glutPostRedisplay();
} /* end func passiveMotionCall */

/**********************************************************************************************************************************/
void entryCall(int state) {
  if(state == GLUT_LEFT) {
    printf("ENTRY/EXIT EVENT: LEFT\n");
  } else if(state == GLUT_ENTERED) {
    printf("ENTRY/EXIT EVENT: ENTERED\n");
  } else {
    printf("UNKNOWN ERROR: glutEntryFunc\n");
  } /* end if/else */
} /* end func entryCall */

/**********************************************************************************************************************************/
void buildMenu() {
  int subMenu1, subMenu2;
  int mainMenu;

  subMenu1 = glutCreateMenu(menuCall);
  glutAddMenuEntry("Redraw", 10);
  glutAddMenuEntry("Quit",   11);

  subMenu2 = glutCreateMenu(menuCall);
  glutAddMenuEntry("Reset Angle", 20);
  glutAddMenuEntry("Reset Size",  21);

  mainMenu = glutCreateMenu(menuCall);
  glutAddMenuEntry("Hello", 0);
  glutAddSubMenu("Reset", subMenu2);
  glutAddSubMenu("System", subMenu1);
  glutAttachMenu(GLUT_RIGHT_BUTTON);

} /* end func buildMenu */

/**********************************************************************************************************************************/
/* Call when we do nothing...  Don't do too much in this function.  It is best to use the timerFunction to do things like rotate as
 that gives precise control over call rate..*/
void idleCall() {
  static int count = 0;
  printf("idle %d\n", count++);

  /* 
  eangle += eangleDelta;
  if(eangle >= 360.0)
    eangle -= 360.0;
   glutPostRedisplay();
  */
} /* end func idleCall */

/**********************************************************************************************************************************/
/* call periodically called -- can have lots of them, and they must be re-registered each time they are called.  Using a timer for
   animation, instead of glutIdleFunc, makes the animation uniform across platforms and will use MUCH less CPU on higher performance
   platforms... */
void animationTimer(int value) 
{

  glutPostRedisplay();
  glutTimerFunc(ANIMATAION_TIMER_CONST_MSEC, animationTimer, 0);

} /* end func animationTimer */

void mouseIdleTimer(int value) 
{

  if ( prevMouseX == mouseX && prevMouseY == mouseY )
  {
    mouseActive = false;
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  glutPostRedisplay();
  glutTimerFunc(MOUSE_IDLE_TIMER_CONST_MSEC /*msecs*/, mouseIdleTimer, 0 /*value to pass*/);

} /* end func mouseIdleTimer */

/**********************************************************************************************************************************/

void mouseWheel( int _dir, int _shift )
{
  if ( _dir == 0  && _shift == 0 )
  {
    // mousewheel down
    mouseRotZ -= MOUSE_ROT_DELTA;
  }
  else if ( _dir == 1 && _shift == 0 )
  {
    // mousewheel up
    mouseRotZ += MOUSE_ROT_DELTA;
  }
  else if ( _dir == 0  && _shift == 1 )
  {
    // SHIFT + mousewheel down
    mouseScale -= MOUSE_SCALE_DELTA;
  }
  else if ( _dir == 1 && _shift == 1 )
  {
    // SHIFT + mousewheel up
    mouseScale += MOUSE_SCALE_DELTA;
  }
}

void init()
{
  shapeVector.clear();
}

void close()
{
  exit(0);
}

void drawMouse()
{
  // convert to glOrtho coords
  float screenMouseX = (float)mouseX;
  float screenMouseY = (float)mouseY;
  screenToOrtho( screenMouseX, screenMouseY );

//  printf("mouseXY %d %d,  screenMouseXY %f %f\n", mouseX, mouseY, screenMouseX, screenMouseY );

  switch (static_cast<int>(mouseShape))
  {
  case (static_cast<int>(SHAPE_TRIANGLE)):
    drawTriangle( screenMouseX, screenMouseY, mouseRotZ, mouseScale, drawColorEnum );
    break;
  case (static_cast<int>(SHAPE_LINE)):
    drawLine( screenMouseX, screenMouseY, mouseRotZ, mouseScale, drawColorEnum );
    break;
  case (static_cast<int>(SHAPE_CIRCLE)):
    drawCircle( screenMouseX, screenMouseY, mouseRotZ, mouseScale, drawColorEnum );
    break;
  case (static_cast<int>(SHAPE_SCALENE)):
    drawScalene( screenMouseX, screenMouseY, mouseRotZ, mouseScale, drawColorEnum );
    break;
  case (static_cast<int>(SHAPE_SQUARE)):
    drawSquare( screenMouseX, screenMouseY, mouseRotZ, mouseScale, drawColorEnum );
  default:
    break;
  }

}














int main(int argc, char *argv[]) 
{
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_RGB | GLUT_DOUBLE | GLUT_DEPTH);
  glutInitWindowSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  glutInitWindowPosition(650, 200);
  mainWindow = glutCreateWindow("Flakey!");
  glutDisplayFunc(displayCall);
/*  glutIdleFunc(idleCall); */
  glutTimerFunc(ANIMATAION_TIMER_CONST_MSEC, animationTimer, 0 );
  glutTimerFunc(MOUSE_IDLE_TIMER_CONST_MSEC, mouseIdleTimer, 0 );
  glutKeyboardFunc(keyboardCall);

/* Use the following to detect key releases
  glutSetKeyRepeat(GLUT_KEY_REPEAT_OFF);
  glutKeyboardUpFunc(keyboardUpCall);
*/

  glutSpecialFunc(specialCall);
  glutMotionFunc(motionCall);
  glutPassiveMotionFunc(passiveMotionCall);
  glutMouseFunc(mouseCall);
  glutEntryFunc(entryCall);
/*  glutJoystickFunc(joystickCall, 1000); */
  glutSpaceballMotionFunc(spaceballMotionCall);
  glutSpaceballRotateFunc(spaceballRotateFunc);
  glutSpaceballButtonFunc(spaceballButtonFunc);
  buildMenu();
  init();
  glutMainLoop();
  return 0;
} /* end func main */


void addShape( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum )
{
  printf("Add shape: %d\n", mouseShape );
  Shape shape;
  shape.shapeType = mouseShape;
  shape.x = _x;
  shape.y = _y;
  shape.rotZ = _rotZ;
  shape.scale = _scale;
  shape.drawColorEnum = _drawColorEnum;

  shapeVector.push_back( shape );

}

void drawTriangle( float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum )
{
  static const float rad3Over2 = 0.8660254f;
  static const float rad3Over4 = rad3Over2/2.f;


  setColor( _drawColorEnum );
  glPushMatrix();
  glTranslatef( (GLfloat)_x, (GLfloat)_y, 0.f );
  glRotatef( _rotZ, 0.f, 0.f, 1.f );
  glScalef( _scale, _scale, 1.0f );
  glBegin(GL_TRIANGLES);
  glVertex2f( -BRUSH_SIZE,  -BRUSH_SIZE * rad3Over2 );
  glVertex2f(  0.f       ,   BRUSH_SIZE * rad3Over2 );
  glVertex2f(  BRUSH_SIZE,  -BRUSH_SIZE * rad3Over2 );
  glEnd();
  glPopMatrix();
}

void drawSquare(float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum)
{
  setColor( _drawColorEnum );
  glPushMatrix();
  glTranslatef( (GLfloat)_x, (GLfloat)_y, 0.f );
  glRotatef( _rotZ, 0.f, 0.f, 1.f );
  glScalef( _scale, _scale, 1.0f );
  glBegin(GL_QUADS);
  glVertex2f( -BRUSH_SIZE,  BRUSH_SIZE );
  glVertex2f(  BRUSH_SIZE,  BRUSH_SIZE );
  glVertex2f(  BRUSH_SIZE, -BRUSH_SIZE );
  glVertex2f( -BRUSH_SIZE, -BRUSH_SIZE );
  glEnd();
  glPopMatrix();

}

void drawLine(float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum)
{
  setColor( _drawColorEnum );
  glPushMatrix();
  glTranslatef( (GLfloat)_x, (GLfloat)_y, 0.f );
  glRotatef( _rotZ, 0.f, 0.f, 1.f );
  glScalef( _scale, _scale, 1.0f );
  glBegin(GL_QUADS);
  glVertex2f( -BRUSH_SIZE,  BRUSH_SIZE * LINE_HEIGHT_SCALAR );
  glVertex2f(  BRUSH_SIZE,  BRUSH_SIZE * LINE_HEIGHT_SCALAR);
  glVertex2f(  BRUSH_SIZE, -BRUSH_SIZE * LINE_HEIGHT_SCALAR);
  glVertex2f( -BRUSH_SIZE, -BRUSH_SIZE * LINE_HEIGHT_SCALAR);
  glEnd();
  glPopMatrix();
}

void drawScalene(float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum)
{
  setColor( _drawColorEnum );
  glPushMatrix();
  glTranslatef( (GLfloat)_x, (GLfloat)_y, 0.f );
  glRotatef( _rotZ, 0.f, 0.f, 1.f );  // this rot is prob superfluous
  glScalef( _scale, _scale, 1.0f );

  float rotAngle = 360.f/NUM_CIRCLE_SECTIONS;
  glBegin(GL_TRIANGLES);
  for ( int i = 0; i < NUM_CIRCLE_SECTIONS; i++ )
  {
    glRotatef( rotAngle, 0.f, 0.f, 1.f);
    glVertex2f( 0.f, 0.f );
    glVertex2f( 0.f, -BRUSH_SIZE );
    //glPushMatrix();
    //glRotatef( rotAngle, 0.f, 0.f, 1.f);
    glVertex2f( BRUSH_SIZE, -BRUSH_SIZE );
    //glPopMatrix();
  }
  glEnd();
  glPopMatrix();
}

void drawCircle(float _x, float _y, float _rotZ, float _scale, ColorType _drawColorEnum)
{
  setColor( _drawColorEnum );
  glPushMatrix();
  glTranslatef( (GLfloat)_x, (GLfloat)_y, 0.f );
  glRotatef( _rotZ, 0.f, 0.f, 1.f );  // this rot is prob superfluous
  glScalef( _scale, _scale, 1.0f );

  float rotAngle = 360.f/NUM_CIRCLE_SECTIONS;
  for ( int i = 0; i < NUM_CIRCLE_SECTIONS; i++ )
  {
    glRotatef( rotAngle, 0.f, 0.f, 1.f);
    glBegin(GL_TRIANGLES);
    glVertex2f( 0.f, 0.f );
    glVertex2f( 0.f, -BRUSH_SIZE );
    //glPushMatrix();
    //glRotatef( rotAngle, 0.f, 0.f, 1.f);
    glVertex2f( BRUSH_SIZE, -BRUSH_SIZE );
    //glPopMatrix();
    glEnd();
  }
  glPopMatrix();
}

void screenToOrtho( float& _screenX, float& _screenY )
{
  float orthoValX = (_screenX) * 2.0f/(WINDOW_WIDTH-1) - 1.0f;
  _screenX = orthoValX;

  float orthoValY = -((_screenY) * 2.0f/(WINDOW_HEIGHT-1) - 1.0f);
  _screenY = orthoValY;
}

void setColor( ColorType _drawColorEnum )
{
  switch ( _drawColorEnum )
  {
  case (COLOR_GREEN):
    glColor4f( 0.f, 1.f, 0.f, 1.0f );
    break;
  case (COLOR_BLUE):
    glColor4f( 0.f, 0.f, 1.f, 1.0f );
    break;
  case (COLOR_MAGENTA):
    glColor4f( 1.f, 0.f, 1.f, 1.0f );
    break;
  case (COLOR_YELLOW):
    glColor4f( 1.f, 1.f, 0.f, 1.0f );
    break;
  case (COLOR_CYAN):
    glColor4f( 0.f, 1.f, 1.f, 1.0f );
    break;
  case (COLOR_ERASE):
    glColor4f( 0.f, 0.f, 0.f, 0.0f );  // // oops I need to be more sophisticated than this. draw shapes to framebuffer object then blend fbo onto background.
    break;
  case (COLOR_BLACK):
    glColor4f( 0.f, 0.f, 0.f, 1.0f );
    break;
  case (COLOR_WHITE):
    glColor4f( 1.f, 1.f, 1.f, 1.0f );
    break;
  case (COLOR_RED):
  default:
    glColor4f( 1.0f, 0.0f, 0.0f, 1.0f );
    break;
  }
}