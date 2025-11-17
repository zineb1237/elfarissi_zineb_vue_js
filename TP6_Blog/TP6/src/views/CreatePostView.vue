<template>
  <form @submit.prevent="addPost">
    <input v-model="title" placeholder="Title" />
    <textarea v-model="body" placeholder="Body"></textarea>
    <input v-model="tags" placeholder="Tags" />

    <button>Ajouter</button>
  </form>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    const title = ref("")
    const body = ref("")
    const tags = ref("")

    const addPost = async () => {
      await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.value,
          body: body.value,
          tags: tags.value.split(",")
        })
      })
      location.href = "/"
    }

    return { title, body, tags, addPost }
  }
}
</script>
<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f0f8ff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  color: #1e40af;
}

input, textarea {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.3rem;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.8rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #2563eb;
}
</style>