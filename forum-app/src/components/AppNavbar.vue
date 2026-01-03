<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">ForumApp</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="/">Accueil</b-nav-item>
      <b-nav-item href="/profile">Profil</b-nav-item>
      <b-nav-item v-if="!user" href="/login">Connexion</b-nav-item>
      <b-nav-item v-if="user" @click="logout">Déconnexion</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { useAuth } from '../composables/useAuth'

export default {
  setup(){
    const { user, logout } = useAuth()
    return { user, logout }
  }
}
</script>
