import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN1-AwfEgpHDwn0woM1azhlEC6r15JPjo",
  authDomain: "library-web-f5c92.firebaseapp.com",
  projectId: "library-web-f5c92",
  storageBucket: "library-web-f5c92.appspot.com",
  messagingSenderId: "142788231546",
  appId: "1:142788231546:web:a0b59c980f0108b52c96c3",
  measurementId: "G-HMKGLCJCG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;