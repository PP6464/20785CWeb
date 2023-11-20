import { initializeApp } from "firebase/app"
import "firebase/firestore"
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})
export const firestore = getFirestore(app)
