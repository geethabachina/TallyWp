
## For mobile app 
https://devdactic.com/native-app-angular-capacitor
https://www.youtube.com/watch?v=YIQCxolfVI0
https://www.youtube.com/shorts/b-kCRPl4ipU

## Should install 
JDK
SDK
Andriod studio

## Run this commands
npm install @capacitor/core
npm install @capacitor/cli --save-dev
npx cap init  (Run this command in internal(visual studio code) terminal)

## Run this commands for andriod app 
npm install @capacitor/android (capacitor.config.js file will generate)
npx cap add android (android folder will generate)
ng build --prod  (dist folder will generate)
npx cap sync
npx cap open android  (andriod studio will open)

## Run this commands for ios app 
npm install @capacitor/ios 
npx cap add ios
npx cap open ios

## Generating apk
Build > Build Bundles(s)/APK(s) > click on "locate" link in the bottom  

## To change the app title
have to chane name in package.json file ("name": "Tally")