README_videoCreation.txt
Jan 5 - 9, 2015

Flakey App Preview creation.

1. CAPTURE SCREEN VIDEO: Used camstudio to capture screen on Riley's laptop, in webapp.

WARNING: camstudio installer has malware/adward.  Dyno-something. I removed it via Windows Programs & Features and reset Chrome.

I recorded region, and kept it to just the Flakey canvas and brushes/bars.

2. RECORD AUDIO: Used Audacity to record sound (me playing the piano...I wrote the Flakey theme music).  Used the microphone on Riley's laptop...I put the laptop right on top of the piano and played a dozen or 2 or 3 dozen tries.  His laptop doesnt have separate mike in...the 1/8" jack is for headset.

3. AUDIO: NORM & NOISE REMOVAL: Removed DC (I think it's called normalize)  and repeated the 4 (?) measures 4 times.  There was some glitches in there...did noise filtering too I think.

4. EDIT VIDEO TIMING: Later I needed to extend the length to match video size, and a little silence at the start, then trimmed out some between to get it to under 30 sec (Apple limit.)

5. ADD SPLASH/TITLE: VirtualDub would not join 2 clips, nor could I figure out how to paste an image (the splash) at the front of the camstudio video. So I used...TRUEEDIT.

6. EDIT VIDEO:  I put a longer splash at front and back, then timed it, and then trimmed to under 30s.  Had to trim a few frames here in there in the action part.

7. TWEAK AUDIO TIME: All of the above video was done without the audio yet.  When I had a good final video time, I tweaked the audio to nearly match it. (kept audio to be slightly less time?)

8. ADD AUDIO: VirtualDub > Audio from other file.

9. FADE (Poss before Audio):  Fade in and out.  Must use VirtualDub "fill" video filter and select "Blend" option in filter list window. Then choose View to show Curve Editor and in the output side, make the value max at frame 0 and min about 1 sec later.  Then at end make it min (SHIFT + CLICK to add pts, CTRL + CLICK to remove) at 1 s before end and max at end (or end - 1.)

9a. INSTALL CCCP CODEC:  
Use video compression = ffdshow Video Codec.

10. (SAVE VIRTUAL DUB PROCESSING SETTINGS)

11. SCALE/MATCH RESOLUTIONS REQUIRED BY APPLE:
e.g. 5 series  1136 x 640  and so on.  

VirtualDub: video filter: resize:  
New Size: Absolute then I put the height in the height box first (e.g. 640)  I think this tells you what size your *content* will become, not the size of the video containing the content. 
Aspect Ratio: Same as source
Framing options: Letterbox/crop to size: e.g. 1136 x 640.
Fill color: 0 0 255 (blue)
Check output size in video filter list.  Can also preview inside filter settings.

12. MOVE TO MAC VIA GOOGLE DRIVE: Upload to Google drive.

13. MACINCLOUD: Get macincloud account: Need OSX Yosemite 10.10.1 or something. Had to upgrade. NOT DONE YET.

14. DOWNLOAD: In macincloud: Download from Google drive.

15. RECODE TO MP4.  Used something already installed on macincloud: Any Video Converter Ultimate.  
WARNING: I dont know if this works to produce mp4's that will be accepted by iTunesConnect.  it uses x264 and iTunesConnect wants h.264.

16. SUBMIT.  Needs to be from OSX Yosemite 10.10.1 or something.  NOT YET DONE.


I did do all my various icons & screenshots.

END.








