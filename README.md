# Welcome to Stocks by Ethan Shealey!

## Getting Started
1) Add a .env to the root of the application with the following contents

```
X_RAPIDAPI_KEY=<RAPID API KEY>
X_RAPIDAPI_HOST=<RAPID APY YAHOO FINANCE HOST>
X_RAPIDAPI_HOST_ALPHA=<RAPID API ALPHA VANTAGE HOST>
```
<sup>Note: you will need to get your API key and Host values from rapidapi.com</sup>
2) Add a firebase.js to the `src/` directory with the following contents

```
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, addDoc, setDoc, getDocs, collection, query, where, doc, updateDoc, arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: '######',
  authDomain: '#####',
  projectId: '#####',
  storageBucket: '######',
  messagingSenderId: '#####',
  appId: '#####'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, db, addDoc, setDoc, getDocs, collection, query, where, doc, updateDoc, arrayRemove, arrayUnion, deleteDoc }
```
<sup>Note: You will need to create an application using Firebase with Authentication and Firebase Storage</sup>