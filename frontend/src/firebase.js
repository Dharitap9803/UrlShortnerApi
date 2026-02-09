import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLQ1K7kStVWjReZ0JZ4w2h4PfHgYge6rQ",
  authDomain: "urlshortnerapi-e6ce6.firebaseapp.com",
  projectId: "urlshortnerapi-e6ce6",
  storageBucket: "urlshortnerapi-e6ce6.firebasestorage.app",
  messagingSenderId: "1034835289800",
  appId: "1:1034835289800:web:70a420375c6f87a2c9a7fd",
  databaseURL: "https://urlshortnerapi-e6ce6-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
