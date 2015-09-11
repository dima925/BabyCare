### On Windows/General:

This repository contains the code that is based on the IONIC framework.

1.  Install NodeJS from https://nodejs.org/
2.  ```npm cache clean``` Clean up some leftovers, may not be required always but doesn't hurt 
3.  ```npm install -g ionic cordova bower gulp``` Installs Ionic+Cordova, Bower and Gulp
4.  ```git clone https://gitlab.com/rhaenni/cleverbaby.git``` Strongly suggested to clone into C:\ or similar so you end up with C:\cleverbaby or a similar very SHORT path (long paths will often cause ```npm install``` to fail on windows since some dependencies will end up in subfolders that are longer than 256 characters)
5.  CD into the project directory and continue with the below: 
6.  ```npm install``` (in the repository)
7.  ```bower install```
8.  ```ionic serve``` at this point you should see app running in the desktop browser
9.  ```ionic state restore``` this will install all cordova platforms (Android/iOS) and plugins so you can test on emulator/real devices
10.  ```ionic run android``` this will run the app in the Android Emulator (if you have the Android SDK installed) or on an Android phone connected to your PC

### To run the Protractor testcases (using Appium to run on emulator/real devices)
1.  ```npm install -g appium protractor``` installs protractor and appium
2.  ```appium-doctor``` (to check everything is setup correctly)

### On Max OSX

1.  Install NodeJS
2.  Install Cordova ```sudo npm install -g cordova```
3.  Install Ionic ```sudo npm install -g ionic```
4.  Install Bower ```sudo npm install -g bower```
5.  Clone Git Repo
6.  ```ionic state restore```
7.  ```bower install```
8.  ```ionic emulate ios``` or ```ionic run ios```

* `SystemConfiguration.framework`

Copyright
---------

Copyright (c) 2015 Anatoly Sokolov.
