// src/firebase.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0Qgw9B29XdUVF22aqvKpqPSq1ORYhE68",
  authDomain: "littercleanupmap.firebaseapp.com",
  projectId: "littercleanupmap",
  storageBucket: "littercleanupmap.appspot.com",
  messagingSenderId: "339611242146",
  appId: "1:339611242146:web:c88ebf904604385c2751fb",
  measurementId: "G-LHG58L42QN"
};

// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
// export const auth = firebase.auth();
// export default firebase;