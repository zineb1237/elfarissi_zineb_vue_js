import { ref } from "vue"

export default function getPost(id) {
  const post = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await fetch("http://localhost:5000/posts/" + id)
      if (!res.ok) throw Error("Post not found")
      post.value = await res.json()
    } catch (err) {
      error.value = err.message
    }
  }

  return { post, error, load }
}
