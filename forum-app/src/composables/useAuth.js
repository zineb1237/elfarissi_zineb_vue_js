import { auth } from '../services/firebase'
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export function useAuth() {
  const user = ref(auth.currentUser)

  const register = (email,password) =>
    createUserWithEmailAndPassword(auth,email,password)

  const login = (email,password) =>
    signInWithEmailAndPassword(auth,email,password)

  const logout = () =>
    signOut(auth).then(()=> user.value=null)

  return { user, register, login, logout }
}
