<template>
  <div>
    <h3>{{ job.titre }}</h3>
    <p><strong>Salaire :</strong> {{ job.salaire }}</p>
    <p><strong>Expérience :</strong> {{ job.experience }} ans</p>
    <p><strong>Description :</strong> {{ job.description }}</p>
    <p><strong>Date :</strong> {{ job.date }}</p>

    <router-link :to="'/jobs/' + job.id">
      <button>Modifier</button>
    </router-link>

    <button @click="supprimer">Supprimer</button>
  </div>
</template>

<script setup>
const props = defineProps(['job'])

function supprimer() {
  if (confirm('supprimer ce emploi ?')) {
    alert('Emploi supprime')
  }
}
</script>
