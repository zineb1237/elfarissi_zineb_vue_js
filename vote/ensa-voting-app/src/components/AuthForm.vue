<template>
  <div class="auth-form">
    <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email universitaire</label>
            <input
          type="email"
          id="email"
          v-model="email"
          placeholder="prenom.nom@ensas.uca.ma"
          required
        />
      </div>
      
 <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          minlength="6"
        />
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire' }}
      </button>
    </form>
    
    <button @click="toggleMode" class="toggle-btn">
         {{ isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter' }}
    </button>
    
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

export default {
  name: 'AuthForm',
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = '';
      
      try {
        if (this.isLogin) {
       
          await signInWithEmailAndPassword(auth, this.email, this.password);
        } else {
         
          await createUserWithEmailAndPassword(auth, this.email, this.password);
        }
        
       
        this.$emit('auth-success');
      } catch (err) {
        this.error = this.getErrorMessage(err.code);
      } finally {
        this.loading = false;
      }
    },
    
    toggleMode() {
      this.$emit('toggle-mode');
    },
    getErrorMessage(code) {
      const messages = {
        'auth/invalid-email': 'Email invalide',
        'auth/user-disabled': 'Compte désactivé',
        'auth/user-not-found': 'Utilisateur non trouvé',
        'auth/wrong-password': 'Mot de passe incorrect',
        'auth/email-already-in-use': 'Email déjà utilisé',
        'auth/weak-password': 'Mot de passe trop faible (min 6 caractères)'
      };
      return messages[code] || 'Une erreur est survenue';
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button[type="submit"]:hover:not(:disabled) {
  background: #0056b3;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.toggle-btn:hover {
  text-decoration: underline;
}

.error {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #ffeaea;
  color: #dc3545;
  border-radius: 4px;
  text-align: center;
}
</style>