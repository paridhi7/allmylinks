import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBihPWewzQ6lkS9F4v7FA_K3ChnaW2E4i4",
  authDomain: "allmylinks-backend.firebaseapp.com",
  projectId: "allmylinks-backend",
  storageBucket: "allmylinks-backend.appspot.com",
  messagingSenderId: "222035620484",
  appId: "1:222035620484:web:d50848e394f284081848d1",
  measurementId: "G-TSGLG0LM44",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
