import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcERO7DsWog45MwE0x2GskJbzTppIv2v8",
  authDomain: "recipe-app-bac15.firebaseapp.com",
  projectId: "recipe-app-bac15",
  storageBucket: "recipe-app-bac15.appspot.com",
  messagingSenderId: "483080097079",
  appId: "1:483080097079:web:e15878a10def26e5595eb2",
  measurementId: "G-WLFB0N8MVS",
  databaseURL: "https://recipe-app-bac15-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };
