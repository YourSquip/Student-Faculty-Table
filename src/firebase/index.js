
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBteH6pE2FYdia31ABV1mK7ELaiJXxdMDg",
  authDomain: "studentdatabase-41d6b.firebaseapp.com",
  projectId: "studentdatabase-41d6b",
  storageBucket: "studentdatabase-41d6b.appspot.com",
  messagingSenderId: "1026981397762",
  appId: "1:1026981397762:web:e6f92b691114f60de1ae1b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export{
    db
}