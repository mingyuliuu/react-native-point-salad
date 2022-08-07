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
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

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
export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export const fs = getFirestore();
export const st = getStorage(app);

export const AuthContext = createContext();

export const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(auth, email, password).catch((e) => {
            console.log(e);
            Alert.alert(
              null,
              "You've entered an invalid email and passward combination. Please try again!",
              [{ text: "OK" }]
            );
          });
        },
        register: async (name, email, password) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then((newUser) => {
              set(ref(db, "userData/" + newUser.user.uid), {
                name: name,
                email: email,
                password: password,
                highestScore: 0,
                profileImage: "https://firebasestorage.googleapis.com/v0/b/point-salad-35352.appspot.com/o/profileImages%2FanoyAvatar.png?alt=media&token=741ac2cd-1d52-4824-b174-d1c633a8413f",
              });

              const userRef = doc(fs, "userData", newUser.user.uid);
              setDoc(userRef, {
                name: name,
                email: email,
                password: password,
                highestScore: 0,
                profileImage: "https://firebasestorage.googleapis.com/v0/b/point-salad-35352.appspot.com/o/profileImages%2FanoyAvatar.png?alt=media&token=741ac2cd-1d52-4824-b174-d1c633a8413f",
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
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
