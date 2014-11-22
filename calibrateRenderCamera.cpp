#include "calibrateRenderCamera.h"

//#include <GL/glew.h>
#include <GL/freeglut.h>
int iGLUTWindowHandle = 0;          // handle to the GLUT window

static const int NUM_METHODS = 4;
static const int STENCIL_ROW_HEIGHT = 8;
static int method = 0;
static const int imageWidth  = 1366;
static const int imageHeight = 768;
static FILE *logFile;

void initOpenGL( int argc, char** argv );
void displayCall();
void keyboardCall(unsigned char key, int x, int y);
void stencilUpdate();
void setupStencil();

#define EXPAND_ARGS(...) __VA_ARGS__
#define LOG_AND_PRINT(logFile, stmt) printf(EXPAND_ARGS stmt); fprintf_s(logFile, EXPAND_ARGS stmt); fflush( logFile );

using namespace std;

int main(int argc, char** argv)
{

  // TODO
  cout<<"You must point the project to a TrueWare buildTree where DLLs in use reside. I choose to append to PATH in the Environment in settings. e.g. PATH=%PATH%;C:\\Users\\TrueVision\\Documents\\TVS\\TrueWare 9.1\\TrueWare\\BuildTree\\bin64"<< endl;

  fopen_s(&logFile,"remapValues.txt", "w" );
  printf(" here \n");
  fprintf_s( logFile, " here \n" );
  fflush( logFile );
  LOG_AND_PRINT( logFile, ("hereNOW %f\n", 6.543) );

  initOpenGL( argc, argv );

  // ---------------------------------------------------------------
  // ---  Timing like in TvsUtils::getTickTime()   ---------------
  // ---------------------------------------------------------------
  LARGE_INTEGER tickFrequency = {0}; /**< system timer tick frequency */
  LARGE_INTEGER tickOffset = {0}; /**< system timer tick offset */
  QueryPerformanceFrequency (&tickFrequency);
  QueryPerformanceCounter (&tickOffset);

  LARGE_INTEGER tick = {0}; /* current system timer tick */

  QueryPerformanceCounter (&tick);

  double startTime = ((((__int64) tick.QuadPart) - ((__int64) tickOffset.QuadPart)) / ((double) tickFrequency.QuadPart));
  // ---------------------------------------------------------------


  /// SOME ACTION HERE THAT YOU WANT TO TIME.

  QueryPerformanceCounter (&tick);

  double endTime = ((((__int64) tick.QuadPart) - ((__int64) tickOffset.QuadPart)) / ((double) tickFrequency.QuadPart));
  double totalTime = endTime - startTime;

  printf(" here, total time %0.07f seconds \n", totalTime );

  printf("In an image window, hit any key to continue \n" );


  _getch();

  fclose( logFile );

}


void initOpenGL(int argc, char** argv)
{
	// Create GL context
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_RGBA | GLUT_ALPHA | GLUT_DOUBLE | GLUT_DEPTH);
    glutInitWindowSize(imageWidth, imageHeight);
    glutInitWindowPosition(0, 0);
    iGLUTWindowHandle = glutCreateWindow("OpenGL");

   // initialize necessary OpenGL extensions
//    glewInit();

    glutDisplayFunc(displayCall);
    glutKeyboardFunc(keyboardCall);

    glutFullScreen();
    glutMainLoop();


}


// http://www.mitchr.me/SS/exampleCode/glut/helloWorld.c.html
//
void displayCall() 
{
  glClearColor( 128, 128, 0, 128);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
//  glEnable(GL_DEPTH_TEST);

  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(-2.0, 2.0, -2.0, 2.0, -2.0, 500.0);
  glViewport(0,0,imageWidth, imageHeight);

  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();

  glColor4ub( 255, 255, 255, 255 );
  glBegin(GL_QUADS);
  glVertex2f( -1.f,  1.f );
  glVertex2f(  1.f,  1.f );
  glVertex2f(  1.f, -1.f );
  glVertex2f( -1.f, -1.f );
  glEnd();


  setupStencil();

  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
  glEnable(GL_STENCIL_TEST);
  glStencilOp(GL_KEEP, GL_KEEP, GL_KEEP);
  glStencilFunc(GL_NOTEQUAL, 1, 1);

  glColor4ub( 255, 255, 255, 255 );
  switch (method)
  {
    case 0:
      glColor4ub( 255, 0, 0, 255 );
      break;
    case 1:
      glColor4ub( 0, 255, 0, 255 );
      break;
    case 2:
      glColor4ub( 0, 0, 255, 255 );
      break;
    case 3:
      glColor4ub( 255, 255, 0, 255 );
      break;
    default:
      break;
  }

  glBegin(GL_QUADS);
  glVertex2f( -1.f,  1.f );
  glVertex2f(  1.f,  1.f );
  glVertex2f(  1.f, -1.f );
  glVertex2f( -1.f, -1.f );
  glEnd();


  //glMatrixMode(GL_PROJECTION);
  //glPushMatrix();
  //glOrtho(0.f, imageWidth, 0, imageHeight, -2.0, 500.0);

  //glColor4ub( 0, 0, 255, 255 );
  //glBegin (GL_POINTS);
  //for ( int col = 0; col < imageWidth/2; col++ )
  //{
  //  for ( int row = 0; row < imageHeight; row += STENCIL_ROW_HEIGHT*2 )
  //  {
  //    for ( int stencilHeight = 0; stencilHeight < STENCIL_ROW_HEIGHT; stencilHeight++ )
  //    {
  //      glVertex2i (col, row + stencilHeight);
  //    }
  //  }
  //}
  //glEnd();

  //glPopMatrix();


  glDisable(GL_STENCIL_TEST);
  glutSwapBuffers();

  static int count = 0;
  printf(" displayCall count %d\n", count++ );
} /* end func displayCall */


/**********************************************************************************************************************************/
/* Quit if we get a 'q' or an escape key. */
void keyboardCall(unsigned char key, int x, int y) 
{
  if ( (key=='s') )
  {
    stencilUpdate();
  }
  
  if((key=='q') || (key==0x1B)) 
    exit(0);
} /* end func keyboardCall */


void setupStencil()
{

  glMatrixMode(GL_PROJECTION);
  glPushMatrix();
  glOrtho(0.f, imageWidth, 0.f, imageHeight, -2.0f, 500.0f);

  glClearStencil (0);
  glClear (GL_STENCIL_BUFFER_BIT);

  glMatrixMode(GL_MODELVIEW);
  glPushMatrix();
  glLoadIdentity();

  // set stencil. This is almost exact as in TvsDsm.cpp
  GLboolean depthTest = glIsEnabled( GL_DEPTH_TEST );
  glStencilFunc (GL_ALWAYS, 1, 1);
  glStencilOp (GL_KEEP, GL_KEEP, GL_REPLACE);
  glDisable (GL_DEPTH_TEST);
  glColorMask( false, false, false, false );
  glDepthMask( false );
  glEnable(GL_STENCIL_TEST);
  glBegin (GL_POINTS);
  for ( int col = 0; col < imageWidth; col++ )
  {
    for ( int row = 0; row < imageHeight; row += STENCIL_ROW_HEIGHT * 2 )
    {
      for ( int stencilHeight = 0; stencilHeight < STENCIL_ROW_HEIGHT; stencilHeight++ )
      {
        glVertex2i (col, row + stencilHeight);
      }
    }
  }
  glEnd();
  glColorMask( true, true, true, true );
  glDepthMask( true );
  if ( depthTest )
    glEnable (GL_DEPTH_TEST);

  glDisable(GL_STENCIL_TEST);

  glPopMatrix(); // MODEL

  glMatrixMode(GL_PROJECTION);
  glPopMatrix(); // PROJ


}

void stencilUpdate()
{
  method++;
  method = method % NUM_METHODS;
  LOG_AND_PRINT(logFile, ("In the stencilBuffer fn, method = %d\n", method ) );

  displayCall();

}

