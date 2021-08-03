import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlGYanx1wrkgBP-mjXFDRs4shKa3fNDv4",
  authDomain: "whatsapp-clone-85060.firebaseapp.com",
  projectId: "whatsapp-clone-85060",
  storageBucket: "whatsapp-clone-85060.appspot.com",
  messagingSenderId: "530856216058",
  appId: "1:530856216058:web:45dd02f9d34c8d3ac71043",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
