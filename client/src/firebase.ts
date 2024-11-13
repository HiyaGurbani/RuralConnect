// src/firebase.ts
import { initializeApp } from 'firebase/app'; // Import only the functions you need
import { getAuth } from 'firebase/auth'; // Import the auth function from firebase/auth
import { getFirestore } from 'firebase/firestore'; // Import Firestore if you need it

// Your Firebase configuration object (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyBd9kaplJSE3ERV89riBcxndph4j7jqjo0",
  authDomain: "ruralconnect-ff973.firebaseapp.com",
  projectId: "ruralconnect-ff973",
  storageBucket: "ruralconnect-ff973.firebasestorage.app",
  messagingSenderId: "1051400254085",
  appId: "1:1051400254085:web:ed10384d72405be108efec",
  measurementId: "G-NFS00HH0FF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the services you need
const auth = getAuth(app); // Authentication
const firestore = getFirestore(app); // Firestore (if you plan to use Firestore)

// Export the auth service for use in other files
export { auth, firestore };
