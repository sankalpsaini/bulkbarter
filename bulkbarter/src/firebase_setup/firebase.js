// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLJX84M3eUI1j4IZDZWuTMcCiiBtyLF7g",
  authDomain: "bulkbarter-28f80.firebaseapp.com",
  projectId: "bulkbarter-28f80",
  storageBucket: "bulkbarter-28f80.appspot.com",
  messagingSenderId: "595241707805",
  appId: "1:595241707805:web:49d1aa4fe637f2dafc19f4",
  measurementId: "G-Q4LN75QTBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// how to ?
/* 
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';
   
    const addTodo = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "todos"), {
              todo: todo,    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    */