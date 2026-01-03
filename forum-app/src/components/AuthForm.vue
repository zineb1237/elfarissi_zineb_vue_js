<template>
  <b-card title="Connexion / Inscription">
    <b-form @submit.prevent="submit">
      <b-form-group label="Email">
        <b-form-input v-model="email" type="email"></b-form-input>
      </b-form-group>
      <b-form-group label="Mot de passe">
        <b-form-input v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">{{ mode }}</b-button>
      <b-button variant="link" @click="toggleMode">
        Basculer {{ mode==='Login'?'Inscription':'Connexion' }}
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
import { useAuth } from '../composables/useAuth'

export default {
  data(){ return { email:'', password:'', mode:'Login' } },
  setup(){ const { login, register } = useAuth(); return { login, register } },
  methods:{
    toggleMode(){ this.mode=this.mode==='Login'?'Register':'Login' },
    submit(){
      if(this.mode==='Login'){
        this.login(this.email,this.password)
          .then(()=>alert('Connecté !'))
          .catch(err=>alert(err.message))
      } else {
        this.register(this.email,this.password)
          .then(()=>alert('Inscrit !'))
          .catch(err=>alert(err.message))
      }
    }
  }
}
</script>
