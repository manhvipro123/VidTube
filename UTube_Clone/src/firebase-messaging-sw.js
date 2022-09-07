import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Upload Video Successfull';
  const notificationOptions = {
    body: 'Click here for details',
    icon: 'src/assets/images/logo.png',
    webpush: {
        fcmOptions: {
          link: "https://vidtube.manhvipro.xyz"
        }
      }
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});