import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_WvMDUirtSNg-lBtxq7-zVvEhEJz_Tr0",
  authDomain: "qe170107.firebaseapp.com",
  projectId: "qe170107",
  storageBucket: "qe170107.firebasestorage.app",
  messagingSenderId: "34104692321",
  appId: "1:34104692321:web:13c8333023e41b7dace420",
  measurementId: "G-NBWVW3N7TS"
};

// Initialize Firebase app if it hasn't been initialized already
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];  // use the existing initialized app
}

// Initialize Auth with AsyncStorage for persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === "auth/already-initialized") {
    auth = getAuth(app);  // use the already initialized auth instance
  } else {
    throw error;
  }
}

export { auth };
export const db = getFirestore(app);
export default app;
