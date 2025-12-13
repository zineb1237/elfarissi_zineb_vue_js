import { createApp } from 'vue'
import App from './App.vue'
import { auth, db } from './firebase'  


console.log('✅ Firebase connecté !')
console.log('Projet:', 'ensavotingapp')
console.log('Auth service:', auth)
console.log('Firestore service:', db)

createApp(App).mount('#app')