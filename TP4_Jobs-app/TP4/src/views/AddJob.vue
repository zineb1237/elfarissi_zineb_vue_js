<template>
  <div>
    <h2>Ajouter un emploi</h2>
    <form @submit.prevent="ajouterJob">
      <input v-model="titre" placeholder="Titre" required />
      <input v-model="salaire" placeholder="Salaire" required />
      <input v-model="experience" placeholder="Annees d expérience" required />
      <textarea v-model="description" placeholder="Description" required></textarea>

      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const titre = ref('')
const salaire = ref('')
const experience = ref('')
const description = ref('')
const router = useRouter()

function ajouterJob() {
  alert(`emploi ajout : ${titre.value}`)
  router.push('/')
}
</script>
