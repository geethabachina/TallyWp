
## for mobile app 
https://devdactic.com/native-app-angular-capacitor
https://www.youtube.com/watch?v=YIQCxolfVI0
https://www.youtube.com/shorts/b-kCRPl4ipU

## should install 
JDK
SDK
Andriod studio

## should run this commands
npm install @capacitor/core
npm install @capacitor/cli --save-dev
npx cap init  (should run in internal(visual studio code) terminal)

## should run this commands for andriod app 
npm install @capacitor/android
npx cap add android (android folder will generate)
ng build --prod  (dist folder will generate)
npx cap sync
npx cap open android  (andriod studio will open)

## should run this commands for ios app 
npm install @capacitor/ios 
npx cap add ios
npx cap open ios

## generating apk
Build > Build Bundles(s)/APK(s) > click on "locate" link in the bottom  


## to change the app title
have to chane name in package.json file ("name": "Tally")