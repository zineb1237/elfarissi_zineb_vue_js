<template>
  <div>
    <b-card v-for="discussion in discussions" :key="discussion.id" class="mb-2">
      <h5>{{ discussion.title }}</h5>
      <p>{{ discussion.content }}</p>
      <small>Par {{ discussion.author }} - {{ discussion.createdAt.toDate().toLocaleString() }}</small>
      <b-button size="sm" href="/discussion/{{discussion.id}}">Voir</b-button>
    </b-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useFirestore } from '../composables/useFirestore'

export default {
  setup(){
    const discussions = ref([])
    const { getDiscussions } = useFirestore()
    onMounted(async()=>{ discussions.value = await getDiscussions() })
    return { discussions }
  }
}
</script>
