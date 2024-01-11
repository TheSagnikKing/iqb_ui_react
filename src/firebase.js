import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCsKTm-8nSXdKgh0m_Q-E2qgropUsVZuTo",
    authDomain: "notificationapp-af121.firebaseapp.com",
    projectId: "notificationapp-af121",
    storageBucket: "notificationapp-af121.appspot.com",
    messagingSenderId: "751987114008",
    appId: "1:751987114008:web:1ef170c205fcfd860b436d"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);