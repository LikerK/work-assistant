import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_9cCzljgN4So_VKXAAzz1ruf5DR733Hc",
  authDomain: "myassistant-work.firebaseapp.com",
  databaseURL: "https://myassistant-work-default-rtdb.firebaseio.com",
  projectId: "myassistant-work",
  storageBucket: "myassistant-work.appspot.com",
  messagingSenderId: "578827617404",
  appId: "1:578827617404:web:66ee93e2023bea791e35f9",
  measurementId: "G-3B76GC6YV4"
};
  
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
