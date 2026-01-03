<template>
  <div>
    <Navbar />
    <b-container class="mt-3">
      <NewDiscussionForm />
      <DiscussionList />
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/AppNavbar.vue'
import NewDiscussionForm from '../components/NewDiscussionForm.vue'
import DiscussionList from '../components/DiscussionList.vue'

export default { components:{ Navbar, NewDiscussionForm, DiscussionList } }
</script>
