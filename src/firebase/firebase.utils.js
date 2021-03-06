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

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setup for Google authentication
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" }); //always trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
