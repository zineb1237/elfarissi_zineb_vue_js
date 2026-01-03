<template>
  <Navbar />
  <b-container class="mt-3">
    <b-card title="Profil">
      <p>Email: {{ user?.email }}</p>
    </b-card>
  </b-container>
</template>

<script>
import Navbar from '../components/AppNavbar.vue'
import { useAuth } from '../composables/useAuth'

export default {
  components:{ Navbar },
  setup(){
    const { user } = useAuth()
    return { user }
  }
}
</script>
