// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig  } from './firebaseConfig ';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

const settings = {timestampsInSnapshots: true};
getFirestore.firestore().settings(settings);