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


// Create a new user Authentication

export const createUserAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const getUserDoc = doc(db, 'users', userAuth.uid);

  const userSnapsShot = await getDoc(getUserDoc);

  if (!userSnapsShot.exists()) {
    const { displayName, email } = userAuth;

    const createAdt = new Date();

    try {
      const uid = userAuth.uid
      await setDoc(getUserDoc, {
        uid,
        displayName,
        email,
        createAdt,
        cardNumber: creditCard,
        balance: 0,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return getUserDoc;
}

// Create a new user with email and password

export const createUserEmail = async (email, password) => {

  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

// LogIn in App

export const signWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

// Remove User Session

export const signOutUser = async () => await signOut(auth);

// Listener auth changes

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const updateUser = async (id, displayName) => {
  const userDoc = doc(db, 'users', id);
  const updateName = { displayName: displayName };
  await updateDoc(userDoc, updateName);
}

export const executeTransfer = async (userId, userTransferId, newQuantityBalanceUser, newQuantityBalanceUserTransfer, uuid, quantity) => {  const userDoc = doc(db, 'users', userId);
  const updateBalanceUser = {balance: newQuantityBalanceUser};
  const userDocTransfer = doc(db, 'users', userTransferId);
  const updateBalanceUserTransfer = {balance: newQuantityBalanceUserTransfer};
  const historyTransfer = doc(db, 'transfers', uuid);
  const historyDate = new Date();

  try {
    await updateDoc(userDoc, updateBalanceUser);
    await updateDoc(userDocTransfer, updateBalanceUserTransfer);
    await setDoc(historyTransfer, {
      uuid,
      sendBy: userId,
      sendTo: userTransferId,
      quantityTransfer: quantity,
      dateTransfer: historyDate
    })
  } catch (error) {
    console.log(error);
  }
}