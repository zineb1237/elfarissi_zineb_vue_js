import { ref } from "vue"

export default function getPosts() {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let res = await fetch("http://localhost:5000/posts")
      if (!res.ok) throw Error("Error loading posts")
      posts.value = await res.json()
    } catch (err) {
      error.value = err.message
    }
  }

  return { posts, error, load }
}
