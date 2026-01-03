<template>
  <b-card title="Nouvelle Discussion">
    <b-form @submit.prevent="submit">
      <b-form-group label="Titre">
        <b-form-input v-model="title"></b-form-input>
      </b-form-group>
      <b-form-group label="Contenu">
        <b-form-textarea v-model="content"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Créer</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { ref } from 'vue'
import { useFirestore } from '../composables/useFirestore'
import { useAuth } from '../composables/useAuth'

export default {
  setup(){
    const title = ref('')
    const content = ref('')
    const { addDiscussion } = useFirestore()
    const { user } = useAuth()
    const submit = async()=>{
      if(!user.value) return alert('Connectez-vous !')
      await addDiscussion(title.value,content.value,user.value)
      alert('Discussion créée !')
      title.value=''; content.value=''
    }
    return { title, content, submit }
  }
}
</script>
