import firebase from "firebase"
import "firebase/storage"
import "firebase/firestore"
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAaVy75Q2YA78FnuM7I6PMT0_uvn86q28g",
    authDomain: "foodapp-hitesh.firebaseapp.com",
    projectId: "foodapp-hitesh",
    storageBucket: "foodapp-hitesh.appspot.com",
    messagingSenderId: "977111647693",
    appId: "1:977111647693:web:eb9f83fef6850eb8323084"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const projectStorage = firebase.storage();
  const projectFirestore =  firebase.firestore()

  export {projectFirestore,projectStorage};