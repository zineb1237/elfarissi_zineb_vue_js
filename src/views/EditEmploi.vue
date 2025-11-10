<template>
  <div>
    <h2>Modifier un emploi</h2>
    <EmploiForm :emploiData="emploi" @saveEmploi="updateEmploi" />
  </div>
</template>

<script>
import EmploiForm from '../components/EmploiForm.vue';

export default {
  components: { EmploiForm },
  data() { return { emploi: {} } },
  mounted() {
    fetch(`http://localhost:3002/emplois/${this.id}`)
      .then(res => res.json())
      .then(data => { this.emploi = data })
      .catch(err => console.log(err));
  },
  methods: {
    updateEmploi(updated) {
      fetch(`http://localhost:3002/emplois/${updated.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err));
    }
  }
}
</script>
