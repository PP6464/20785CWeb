import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
});
export const firestore = getFirestore(app);

async function addFeed() {
  const feedCollection = collection(firestore, "home");

  try {
    // Replace the values with the actual data you want to store
    const newFeedRef = await addDoc(feedCollection, {
      title: "Some Feed",
      value: "Some Feed Value",
      type: "picture",
      time: "2023-01-01T12:00:00Z",
      imageUrl: "/assets/logo-light-long.png",
    });

    console.log("New feed added with ID:", newFeedRef.id);
  } catch (error) {
    console.error("Error adding feed:", error);
  }
}

// Call the function to add a new feed
addFeed();