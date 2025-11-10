<template>
  <div>
    <h2>Ajouter un emploi</h2>
    <EmploiForm @saveEmploi="addEmploi" />
  </div>
</template>

<script>
import EmploiForm from '../components/EmploiForm.vue';

export default {
  components: { EmploiForm },
  methods: {
    addEmploi(emploi) {
      fetch('http://localhost:3002/emplois', {
        method: 'POST',
        headers: { 'Content': 'app/json' },
        body: JSON.stringify(emploi)
      })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err));
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} 
</style>