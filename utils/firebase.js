import { initializeApp } from 'firebase/app'
// import { creditCard } from './creditCard';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyASOuVLdI7B5dnI14WdWcx2xNllvvtHKNI",
  authDomain: "bankio-f9794.firebaseapp.com",
  projectId: "bankio-f9794",
  storageBucket: "bankio-f9794.appspot.com",
  messagingSenderId: "763087503796",
  appId: "1:763087503796:web:cab982aaa80e1d59cbb2e1"
};


initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

// LogIn in App

export const signWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

// Remove User Session

export const signOutUser = async () => await signOut(auth);

// Listener auth changes

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const executeTransfer = async (userId, newQuantityBalanceUser, uuid, total) => {
  const userDoc = doc(db, 'users', userId);
  const updateBalanceUser = { balance: newQuantityBalanceUser };
  const historyTransfer = doc(db, 'transfers', uuid);
  const historyDate = new Date();

  try {
    await updateDoc(userDoc, updateBalanceUser);
    await setDoc(historyTransfer, {
      uuid,
      sendBy: userId,
      quantityTransfer: total,
      dateTransfer: historyDate,
      subject: 'Restaurant'
    })
  } catch (error) {
    console.log(error);
  }
}