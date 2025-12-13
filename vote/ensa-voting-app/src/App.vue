<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo-section">
            <img :src="require('./assets/logo.png')" alt="ENSA Safi" class="logo">
            <h1>ENSA Safi - Vote Événements</h1>
          </div>
          
          <div v-if="user" class="user-section">
            <span class="user-email">{{ user.email }}</span>
            <button @click="logout" class="logout-btn">Déconnexion</button>
          </div>
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <div v-if="!user" class="auth-view">
          <AuthForm 
            :isLogin="isLogin" 
            @auth-success="handleAuthSuccess"
            @toggle-mode="toggleAuthMode"
          />
        </div>
        
        <div v-else class="app-content">
          <EventsList :user="user" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthForm from './components/AuthForm.vue';
import EventsList from './components/EventsList.vue';

export default {
  name: 'App',
  components: {
    AuthForm,
    EventsList
  },
  data() {
    return {
      user: null,
      isLogin: true
    };
  },
  mounted() {
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email
        };
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    handleAuthSuccess() {
      
      console.log('Authentification réussie');
    },
    
    toggleAuthMode() {
      this.isLogin = !this.isLogin;
    },
    
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-header {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 40px;
  width: auto;
}

.logo-section h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  font-size: 0.9rem;
  opacity: 0.9;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #ff3742;
}

.app-main {
  min-height: calc(100vh - 72px);
  padding: 2rem 0;
}

.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .logo-section {
    flex-direction: column;
  }
  
  .user-section {
    flex-direction: column;
  }
  
  .logo {
    margin-bottom: 0.5rem;
  }
}
</style>