A little something by Mnotho

Decisions & Assumptions:

1. Stored tasks locally using async storage (no redux-persist for this matter). Anything backend would've been overkill fo this demo.

2. Added a one second delay upon adding tasks to lengthen the async execution

Notable improvements are around memoizing and optimizing list renders.

To run project:

1. yarn / npm i / npx expo install

2. Yarn start, the Metro Bundler will start
3. Make sure you're on expo go (press s to switch)
4. You can either scan the QR code and run on a physical device (Will require installing Expo Go) or select a platform from one of the options provided

NB: This is an Expo Go build, but can be turned into a development build that'll allow use and installation of RN 3rd party libraries and use of eas for app distribution either internally or to stores.
