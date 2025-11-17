<template>
  <div>
    <h2>Modifier emploi</h2>
    <form @submit.prevent="modifierJob">
      <input v-model="job.titre" placeholder="Titre" />
      <input v-model="job.salaire" placeholder="Salaire" />
      <input v-model="job.experience" placeholder="Expérience" />
      <textarea v-model="job.description" placeholder="Description"></textarea>

      <button type="submit">Enregistrer</button>
      <button @click="supprimerJob" type="button">Supprimer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const job = ref({})

onMounted(() => {
  
  const id = route.params.id
  job.value = {
    id,
    titre: 'Développeur Vue.js',
    salaire: '6000 MAD',
    experience: 2,
    description: 'Développement front-end'
  }
})

function modifierJob() {
  alert('Emploi modifié !')
  router.push('/')
}

function supprimerJob() {
  if (confirm('Voulez-vous supprimer cet emploi ?')) {
    alert('Emploi supprimé !')
    router.push('/')
  }
}
</script>
