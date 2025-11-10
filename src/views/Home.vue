<template>
  <div>
    <div class="filter-section">
      <input
        type="text"
        v-model="searchTerm"
        placeholder=" Rechercher par titre..."
        class="filter-input"
      />
    </div>

    <h1>Emplois</h1>
    <button @click="$router.push('/add')">Ajouter un emploi</button>

   
    <EmploiList
      :emplois="filteredEmplois"
      @deleteEmploi="deleteEmploi"
      @showDetails="openModal"
    />

   
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <h2>{{ selectedEmploi.titre }}</h2>
        <p><strong>Description :</strong> {{ selectedEmploi.description }}</p>
        <p><strong>Salaire :</strong> {{ selectedEmploi.salaire }}€</p>
        <p><strong>Date :</strong> {{ selectedEmploi.date }}</p>
        <p><strong>Expérience :</strong> {{ selectedEmploi.experience }} ans</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmploiList from '../components/EmploiList.vue';

export default {
  name: 'HomeView',
  components: { EmploiList },
  data() {
    return {
      emplois: [],
      searchTerm: '',
      showModal: false,
      selectedEmploi: {},
    };
  },
  computed: {
    filteredEmplois() {
      if (!this.searchTerm) return this.emplois;
      return this.emplois.filter(emploi =>
        emploi.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    fetchEmplois() {
      fetch('http://localhost:3002/emplois')
        .then(res => res.json())
        .then(data => { this.emplois = data; })
        .catch(err => console.log(err));
    },
    deleteEmploi(id) {
      if (confirm('Voulez-vous vraiment supprimer cet emploi ?')) {
        fetch(`http://localhost:3002/emplois/${id}`, { method: 'DELETE' })
          .then(() => { this.fetchEmplois(); })
          .catch(err => console.log(err));
      }
    },
    openModal(emploi) {
      this.selectedEmploi = emploi;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedEmploi = {};
    }
  },
  mounted() {
    this.fetchEmplois();
  },
};
</script>

<style scoped>
div {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #f9fbff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,50,100,0.1);
}

h1 {
  color: #0d47a1;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 20px;
}

button {
  background: linear-gradient(180deg, #1e88e5, #1565c0);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
  margin-bottom: 20px;
}

button:hover {
  background: linear-gradient(180deg, #42a5f5, #1e88e5);
}

.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-input {
  width: 60%;
  padding: 10px 14px;
  border: 2px solid #1e88e5;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.filter-input:focus {
  border-color: #0d47a1;
  box-shadow: 0 0 6px rgba(13,71,161,0.4);
}

.filter-input::placeholder {
  color: #999;
  font-style: italic;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 400vw;
  height: 100vh;
  background: rgba(117, 102, 102, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  text-align: left;
}


.modal-card h2 {
  font-size: 20px;
  color: #0d47a1;
  margin-bottom: 12px;
}

.modal-card p {
  margin: 6px 0;
  color: #333;
  font-size: 14px;
}

.modal-card button {
  margin-top: 15px;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #1e88e5;
  color: white;
  cursor: pointer;
}

.modal-card button:hover {
  background: #1565c0;
}

@media (max-width: 500px) {
  .modal-card {
    padding: 15px;
  }
  .modal-card h2 {
    font-size: 18px;
  }
  .modal-card p {
    font-size: 13px;
  }
  .modal-card button {
    width: 100%;
  }
}

@media (max-width: 640px) {
  div {
    margin: 20px;
    padding: 15px;
  }

  h1 {
    text-align: center;
    font-size: 22px;
  }

  button {
    width: 100%;
    font-size: 16px;
  }

  .filter-input {
    width: 90%;
  }
}
</style>