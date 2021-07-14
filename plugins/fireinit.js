import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyDp2tImQeFgIndbzBweb0AWsOZsRUt-_p8",
    authDomain: "diamond-rush-b9ad9.firebaseapp.com",
    projectId: "diamond-rush-b9ad9",
    storageBucket: "diamond-rush-b9ad9.appspot.com",
    messagingSenderId: "395929922786",
    appId: "1:395929922786:web:38cdf60577621f683882bb",
    measurementId: "G-DX6DV52CRS"
};

if (!firebase.apps.length) firebase.initializeApp(config)

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.firestore()
export default firebase;