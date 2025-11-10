<template>
  <ul>
    <li v-for="emploi in emplois" :key="emploi.id">
      <strong>{{ emploi.titre }}</strong> - {{ emploi.salaire }}
      <button @click="$router.push(`/edit/${emploi.id}`)">Modifier</button>
      <button @click="$emit('deleteEmploi', emploi.id)">Supprimer</button>
      <button @click="$emit('showDetails', emploi)">Détails</button>
    </li>
  </ul>
</template>

<script>
export default { props: ['emplois'] }
</script>
<style scoped>
ul.emploi-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 6px 18px rgba(18,38,63,0.05);
}
.emploi-info { display:flex; flex-direction:column; gap:4px; }
.emploi-title { font-weight:600; color:#07263f; }
.emploi-meta { color:#6b7280; font-size:13px; }
.btn-group { display:flex; gap:8px; }
button { cursor:pointer; border-radius:8px; padding:6px 10px; font-weight:600; }


button[type="button"].edit {
  background: linear-gradient(180deg,#1e88e5,#1565c0);
  color:#fff;
  border:none;
}
button[type="button"].remove {
  background:#fff5f5;
  color:#e53935;
  border:1px solid rgba(229,57,53,0.08);
}
</style>
