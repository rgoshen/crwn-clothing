import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import dotenv from "dotenv";

dotenv.config({ silent: true });

const config = {
  apiKey: "AIzaSyBJ6yuH-aJ4-TIwp_Owc5tJbmyKy9-_Wk0",
  authDomain: "crwn-db-18197.firebaseapp.com",
  projectId: "crwn-db-18197",
  storageBucket: "crwn-db-18197.appspot.com",
  messagingSenderId: "314490709927",
  appId: "1:314490709927:web:2e57123c785ed2ee293882",
  measurementId: "G-T9XMVW6WLE",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // simply returns if not signed in

  //verify is firestore document exists already
  const userRef = firestore.doc(`users/${userAuth.uid}`); //documentRef obj
  const snapShot = await userRef.get(); //represents the data only

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //creates new user document object in db
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user, ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setup for Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //always trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
