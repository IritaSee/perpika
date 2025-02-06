import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArtsZfjpcT_fNwAGoMOJPQyWaoewffos8",
  authDomain: "perpika-14807.firebaseapp.com",
  projectId: "perpika-14807",
  storageBucket: "perpika-14807.firebasestorage.app",
  messagingSenderId: "626990454015",
  appId: "1:626990454015:web:59982b117d7a630f24e8ca",
  measurementId: "G-10ZM6MXM57"
}

const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const storage = getStorage(app)
const auth = getAuth(app)

// Storage Rules:
/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{allPaths=**} {
      allow read, write: if true;  // Allow public access for uploads directory
    }
  }
}
*/

export { storage, auth }
