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

// async function test() {
//   const userID = "jOJpmz6s0xVz86npV8KrmJnYnFy2";
//   let snapshot = firebase
//     .firestore()
//     .collection("users")
//     .doc(userID)
//     .collection("chats");
//   let data = await snapshot.get();
//   console.log("User:", userID);
//   console.log("Chats with the following people:");
//   data.forEach((doc) => {
//     console.log(doc.data());
//   });
//   snapshot = await snapshot
//     .doc("dAmZ6pW8CXPy4Dff2zJDxUqMy973")
//     .collection("messages");
//   data = await snapshot.get();
//   data.forEach((doc) => {
//     const time = doc.data().timestamp.toDate();
//     const short = time.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     console.log(short);
//   });
// }
// test();
export { db, auth, storage };
