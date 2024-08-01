// firebaseConfig.js
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB8HiOSxlsvABB1mk-76DhJBSBqk388jT8",
    authDomain: "loneliness-mtechub.firebaseapp.com",
    projectId: "loneliness-mtechub",
    storageBucket: "loneliness-mtechub.appspot.com",
    messagingSenderId: "55052199625",
    appId: "1:55052199625:android:1b71bb544224086353cf18",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

async function getFcmToken() {
    requestUserPermission()
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        return fcmToken
    } else {
        console.log('Failed to get FCM token');
    }
}

function onMessageListener() {
    return messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
}

export {
    getFcmToken,
    onMessageListener,
    requestUserPermission
};
