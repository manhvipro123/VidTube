import { initializeApp } from "firebase/app";
import { getMessaging , onBackgroundMessage} from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDqBQ0q3culUUruJRyUl94J8T_p04inSE8",
  authDomain: "clone-a1137.firebaseapp.com",
  projectId: "clone-a1137",
  storageBucket: "clone-a1137.appspot.com",
  messagingSenderId: "559607747495",
  appId: "1:559607747495:web:c6b9031f4eabffccf0dc82",
  measurementId: "G-9KT206ZQ3M"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: 'src/assets/images/logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});