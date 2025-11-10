<template>
  <form class="form-card" @submit.prevent="handleSubmit">
  
    <div class="form-row single">
      <div>
        <label>Titre :</label>
        <input v-model="emploi.titre" required />
  </div>
                                 </div>

    
    <div class="form-row single">
      <div>
     <label>Description :</label>
        <textarea v-model="emploi.description" required></textarea>
      </div>
    </div>


    <div class="form-row">
      <div>
     <label>Salaire :</label>
     
     <input v-model="emploi.salaire" required />
      </div>
      <div>
        <label>Date de création :</label>
     <input type="date" v-model="emploi.date" required />
      </div>
    </div>

  
    <div class="form-row single">
      <div>
        <label>Année d'expérience :</label>
        <input type="number" v-model="emploi.experience" required />
      </div>
    </div>

   
    <div class="form-actions">
      <button type="button" class="cancel" @click="$router.back()">Annuler</button>
      <button type="submit" class="save">Enregistrer</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    emploiData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      emploi: { ...this.emploiData }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("saveEmploi", this.emploi);
    }
  }
};
</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(12, 35, 60, 0.06);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}
.form-row.single {
  grid-template-columns: 1fr;
}
label {
  font-size: 13px;
  color: #556;
  margin-bottom: 6px;
  display: block;
}
input,
textarea,
select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6eef7;
  font-size: 14px;
}
textarea {
  min-height: 110px;
  resize: vertical;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
.save {
  background: linear-gradient(180deg, #1e88e5, #1565c0);
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
}
.cancel {
  background: transparent;
  border: 1px solid #dbe9fb;
  color: #07263f;
  padding: 8px 12px;
  border-radius: 10px;
}
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
