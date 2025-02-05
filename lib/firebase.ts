import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA0x0AhF1zy2LmZaTU1gRs-E-VGegOAGrs",
  authDomain: "perpika-1d989.firebaseapp.com",
  projectId: "perpika-1d989",
  storageBucket: "perpika-1d989.firebasestorage.app",
  messagingSenderId: "1071080185655",
  appId: "1:1071080185655:web:04ee82f2ca99a43bd304b2",
  measurementId: "G-87NPLWW080"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
