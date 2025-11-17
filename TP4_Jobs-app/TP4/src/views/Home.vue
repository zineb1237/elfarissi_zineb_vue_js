<template>
  <div>
    <h2>Liste des emplois disponibles</h2>

    <FilterNav @search="searchText = $event" />

    <ul>
      <li v-for="job in filteredJobs" :key="job.id">
        <strong>{{ job.titre }}</strong> - {{ job.salaire }}
        <router-link :to="'/jobs/' + job.id">Détails</router-link>
      </li>
    </ul>

    <router-link to="/add">
      <button>Ajouter un nouvel emploi</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterNav from '../components/FilterNav.vue'

const searchText = ref('')
const jobs = ref([
  { id: 1, titre: 'Developpeur Vue.js', salaire: '6000 MAD', description: '...', experience: 2, date: '2025-11-10' },
  { id: 2, titre: 'Administrateur ', salaire: '8000 MAD', description: '...', experience: 3, date: '2025-10-30' },
  { id: 1, titre: 'DEVLOPPEUR Vue.js', salaire: '6000 MAD', description: '...', experience: 7, date: '2025-9-01' }
])

const filteredJobs = computed(() =>
  jobs.value.filter(j => j.titre.toLowerCase().includes(searchText.value.toLowerCase()))
)
</script>
