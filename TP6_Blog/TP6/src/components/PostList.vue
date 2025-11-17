<template>
  <div class="post-list">
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue"

export default {
  props: ["posts"],
  components: { SinglePost }
}
</script>

<style scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
