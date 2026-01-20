import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// আপনার কনফিগারেশন (Screenshot 675 থেকে নেওয়া)
const firebaseConfig = {
  apiKey: "AIzaSyDtC8uECybxgLCl1iTL3-wewqoPnaOHq_8",
  authDomain: "tasty-plate-db-17643.firebaseapp.com",
  projectId: "tasty-plate-db-17643",
  storageBucket: "tasty-plate-db-17643.firebasestorage.app",
  messagingSenderId: "221798139012",
  appId: "1:221798139012:web:411502367cfcde2a66eed1"
};

// অ্যাপ ইনিশিয়ালাইজ করা (একদম সিম্পল লজিক)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// সার্ভিস এক্সপোর্ট
export const db = getFirestore(app);
export const auth = getAuth(app);
// এই লাইনটি ফাইলের একদম শেষে যোগ করুন
export const isFirebaseConfigured = true;