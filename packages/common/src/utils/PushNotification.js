import "firebase/messaging";
import firebase from "firebase/app";
import { savePushToken } from "./ApiUtils";
import { FCM_TOKEN, FIREBASE_CONFIG } from "../constants";

const firebaseCloudMessaging = {
  tokenInLocalStorage: () => {
    return localStorage.getItem(FCM_TOKEN);
  },

  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    try {
      if (this.tokenInLocalStorage() !== null) {
        return false;
      }
      const messaging = firebase.messaging();
      messaging.onTokenRefresh(async () => {
        const token = await messaging.getToken();
        savePushToken({ token })
          .then((res) => {
            localStorage.setItem(FCM_TOKEN, res.token);
          })
          .catch((error) => {
            console.log(error);
            localStorage.removeItem(FCM_TOKEN);
          });
      });
      const token = await messaging.getToken();
      savePushToken({ token }).then((res) => {
        localStorage.setItem(FCM_TOKEN, res.token);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export { firebaseCloudMessaging };
