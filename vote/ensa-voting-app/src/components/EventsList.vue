<template>
  <div class="events-list">
    <h2>Événements à voter</h2>
    
    <div v-if="loading" class="loading">
      Chargement des événements...
    </div>
    
    <div v-else-if="events.length === 0" class="no-events">
      Aucun événement disponible
    </div>
    
    <div v-else class="events-container">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-header">
               <h3>{{ event.title }}</h3>
          <span class="event-date">{{ formatDate(event.date) }}</span>
        </div>
        
        <p class="event-description">{{ event.description }}</p>
        
        <div class="event-details">
          <span class="price-tag" :class="{ free: event.isFree }">
            {{ event.isFree ? 'Gratuit' : `Prix: ${event.Price || 0} MAD` }}
          </span>
          <span class="created-at">
           Créé le {{ formatDate(event.createdAt) }}
          </span>
        </div>
        
        <div class="vote-section">
          <div class="vote-counts">
            <div class="vote-count yes">
              <span>👍 Yes:</span>
              <strong>{{ event.yesVotes || 0 }}</strong>
            </div>
            <div class="vote-count no">
              <span>👎 No:</span>
              <strong>{{ event.noVotes || 0 }}</strong>
            </div>
          </div>
          <div class="vote-buttons">
            <button 
              @click="vote(event.id, 'yes')"
              :class="{ active: userVotes[event.id] === 'yes' }"
              :disabled="!user || loadingVote === event.id"
              class="vote-btn yes-btn"
            >
              {{ loadingVote === event.id ? '...' : '👍 Yes' }}
            </button>
            <button 
              @click="vote(event.id, 'no')"
              :class="{ active: userVotes[event.id] === 'no' }"
              :disabled="!user || loadingVote === event.id"
              class="vote-btn no-btn"
            >
              {{ loadingVote === event.id ? '...' : '👎 No' }}
            </button>
          </div>
          
          <div v-if="userVotes[event.id]" class="current-vote">
            Votre vote: <strong>{{ userVotes[event.id] === 'yes' ? 'Yes' : 'No' }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { 
  collection,
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';

export default {
  name: 'EventsList',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      events: [],
      userVotes: {},
      loading: true,
      loadingVote: null
    };
  },
  async mounted() {
    await this.loadEvents();
    if (this.user) {
      await this.loadUserVotes();
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.loadUserVotes();
        } else {
          this.userVotes = {};
        }
      }
    }
  },
  methods: {
    async loadEvents() {
      try {
        const eventsRef = collection(db, 'Events');
        
        
        onSnapshot(eventsRef, (snapshot) => {
          this.events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          this.loading = false;
        });
        
      } catch (error) {
        console.error('Erreur chargement événements:', error);
        this.loading = false;
      }
    },
    
    async loadUserVotes() {
      if (!this.user) return;
      
      try {
        const votesRef = doc(db, 'Votes', this.user.uid);
        const votesDoc = await getDoc(votesRef);
        
        if (votesDoc.exists()) {
          this.userVotes = votesDoc.data();
        }
      } catch (error) {
        console.error('Erreur chargement votes:', error);
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Date non définie';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    async vote(eventId, voteType) {
      if (!this.user) {
        alert('Veuillez vous connecter pour voter');
        return;
      }
      
      this.loadingVote = eventId;
      
      try {
        
        const votesRef = doc(db, 'Votes', this.user.uid);
        await setDoc(votesRef, {
          [eventId]: voteType
        }, { merge: true });
        
        
        await this.updateEventVotes(eventId, voteType);
        
        
        this.userVotes[eventId] = voteType;
        this.userVotes = { ...this.userVotes };
        
      } catch (error) {
        console.error('Erreur lors du vote:', error);
        alert('Erreur lors du vote');
      } finally {
        this.loadingVote = null;
      }
    },
    
    async updateEventVotes(eventId, newVote) {
      const eventRef = doc(db, 'Events', eventId);
      const eventDoc = await getDoc(eventRef);
      
      if (!eventDoc.exists()) return;
      
      const eventData = eventDoc.data();
      const currentYesVotes = eventData.yesVotes || 0;
      const currentNoVotes = eventData.noVotes || 0;
      
      
      const previousVote = this.userVotes[eventId];
      
      let yesVotes = currentYesVotes;
      let noVotes = currentNoVotes;
      
      
      if (previousVote === 'yes') yesVotes--;
      if (previousVote === 'no') noVotes--;
      
      
      if (newVote === 'yes') yesVotes++;
      if (newVote === 'no') noVotes++;
      
     
      await updateDoc(eventRef, {
        yesVotes,
        noVotes,
        updatedAt: new Date().toISOString()
      });
    }
  }
};
</script>

<style scoped>
.events-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.loading, .no-events {
  text-align: center;
  padding: 3rem;
  color: #666;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.event-header h3 {
  margin: 0;
  color: #222;
  font-size: 1.25rem;
}

.event-date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
}

.event-description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.event-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.price-tag {
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.875rem;
}

.price-tag.free {
  background: #e8f5e9;
  color: #2e7d32;
}

.created-at {
  color: #888;
  font-size: 0.875rem;
}

.vote-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vote-counts {
  display: flex;
  gap: 2rem;
}

.vote-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vote-count.yes {
  color: #4CAF50;
}

.vote-count.no {
  color: #f44336;
}

.vote-buttons {
  display: flex;
  gap: 1rem;
}

.vote-btn {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.vote-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.vote-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.yes-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.yes-btn:hover:not(:disabled) {
  background: #45a049;
  border-color: #45a049;
}

.no-btn.active {
  background: #f44336;
  color: white;
  border-color: #f44336;
}

.no-btn:hover:not(:disabled) {
  background: #e53935;
  border-color: #e53935;
}

.current-vote {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .events-list {
    padding: 1rem;
  }
  
  .event-header {
    flex-direction: column;
  }
  
  .event-date {
    margin-top: 0.5rem;
  }
  
  .event-details {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .vote-buttons {
    flex-direction: column;
  }
}
</style>