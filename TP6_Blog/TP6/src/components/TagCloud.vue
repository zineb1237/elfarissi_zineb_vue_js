<template>
  <div class="tags">
    <h3>Tags</h3>
    <div class="tags-list">
      <router-link 
        v-for="tag in uniqueTags" 
        :key="tag"
        :to="`/tags/${tag}`"
        class="tag">
        #{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts"],
  computed: {
    uniqueTags() {
      let all = []
      this.posts.forEach(p => all.push(...p.tags))
      return [...new Set(all)]
    }
  }
}
</script>

<style scoped>
.tags {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

h3 {
  margin-bottom: 10px;
  color: #1e293b;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: #3b82f6;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
}

.tag:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}
</style>
