import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { requestUserPermission } from './firebaseConfig';

export const foregroundNotificationListener = () => {
    requestUserPermission();
    return messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);

        PushNotification.localNotification({
            // channelId: "testing-channal-id",
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
        });
    });
};

// export const backgroundMessageHandler = async remoteMessage => {
//     console.log('Message handled in the background!!!!!!!!', remoteMessage);
//     // Perform any task you want with the message data
// };
