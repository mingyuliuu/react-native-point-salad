import React, { createContext, useState } from "react";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxOdvxK_7oBjXE9LNLqXv_FZ3uUmqR2-s",
  authDomain: "point-salad-35352.firebaseapp.com",
  projectId: "point-salad-35352",
  storageBucket: "point-salad-35352.appspot.com",
  messagingSenderId: "522435040550",
  appId: "1:522435040550:web:b5171b62683b8403935de7",
  measurementId: "G-Y0F7NK2T37",
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
//export const auth = firebase.auth();
export const auth = getAuth(app);

export const AuthContext = createContext();

export const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
