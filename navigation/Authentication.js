import React, { useState, createContext } from "react";
import { Alert } from "react-native";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

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
export const db = getDatabase();

export const AuthContext = createContext();

export const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(email, password)
            .catch((e) => {
              console.log(e);
              Alert.alert(null, "You've entered an invalid email and passward combination. Please try again!", [
                { text: "OK" },
              ]);
            });
        },
        register: async (name, email, password) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then((newUser) => {
              set(ref(db, "userData/" + newUser.user.uid), {
                name: name,
                email: email,
                password: password,
              });
            })
            .catch((e) => {
              console.log(e);
              Alert.alert(null, "Please enter a valid email!", [
                { text: "OK" },
              ]);
            });
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
