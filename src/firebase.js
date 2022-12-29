import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'ktv-da8d4.firebaseapp.com',
  databaseURL: 'https://ktv-da8d4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ktv-da8d4',
  storageBucket: 'ktv-da8d4.appspot.com',
  messagingSenderId: '691928243528',
  appId: '1:691928243528:web:5827f98e35b6200a51677d',
  measurementId: 'G-EQSR98Y0VF'
}

initializeApp(firebaseConfig)

export const db = ref(getDatabase())
