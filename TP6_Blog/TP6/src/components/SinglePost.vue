<template>
  <div class="post">
    <h3>{{ post.title }}</h3>

    <p>{{ post.body.substring(0, 50) }}...</p>

    <div class="tags">
      <strong>Tags :</strong>
      <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>

    <router-link :to="`/posts/${post.id}`" class="read-more">Lire l'article</router-link>
  </div>
</template>

<script>
export default {
  props: ["post"]
}
</script>

<style scoped>
.post {
  background-color: #f8fafc; /* fond clair doux */
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.post:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

h3 {
  color: #1e293b;
  margin-bottom: 10px;
}

p {
  color: #334155;
  margin-bottom: 15px;
}

.tags {
  margin-bottom: 15px;
}

.tag {
  background-color: #3b82f6;
  color: white;
  padding: 3px 8px;
  border-radius: 8px;
  margin-right: 5px;
  font-size: 0.85rem;
}

.read-more {
  display: inline-block;
  padding: 8px 15px;
  background-color: #1e40af;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.read-more:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}
</style>
