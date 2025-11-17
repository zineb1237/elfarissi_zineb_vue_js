<template>
  <div style="margin-bottom: 15px;">
    <input
      type="text"
      placeholder="Rechercher un emploi..."
      v-model="search"
      @input="$emit('search',search)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')
</script>
