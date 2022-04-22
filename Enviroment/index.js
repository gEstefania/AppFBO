const fs = require('fs');
const path = require('path');
const {copyFileSync} = fs;

const enviroment = process.argv.slice(2)[0];

const androidFile = path.resolve(__dirname, enviroment, 'google-services.json');
const iosFile = path.resolve(__dirname, enviroment, 'GoogleService-Info.plist');

const pathCopyFileAndroid = path.resolve(__dirname, '..', 'android', 'app', 'google-services.json');
const pathCopyFileIOS = path.resolve(__dirname, '..', 'ios', 'GoogleService-Info.plist');

const changeEnvironment = async () => {
    try {
        //PushEnvironment android
        copyFileSync(androidFile, pathCopyFileAndroid);
        //PushEnvironment ios
        copyFileSync(iosFile, pathCopyFileIOS);
        
    } catch (error) {
        console.error(error)
    }
}

changeEnvironment()