import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Vos clés Firebase (gardez-les secrètes !)
const firebaseConfig = {
  apiKey: "AIzaSyDuV2ZpprDy-RnFG2S6ZJ_3h9jcceaoNHA",
  authDomain: "ensavotingapp.firebaseapp.com",
  projectId: "ensavotingapp",
  storageBucket: "ensavotingapp.firebasestorage.app",
  messagingSenderId: "435084550410",
  appId: "1:435084550410:web:5080167b16beffd7281af3"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services (sans analytics pour l'instant)
export const auth = getAuth(app);
export const db = getFirestore(app);