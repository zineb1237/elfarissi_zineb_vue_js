<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <TagCloud :posts="[post]" />
  </div>
</template>

<script>
import getPost from "../composables/getPost"
import TagCloud from "../components/TagCloud.vue"
import { useRoute } from "vue-router"

export default {
  components: { TagCloud },
  setup() {
    const route = useRoute()
    const { post, load } = getPost(route.params.id)
    load()
    return { post }
  }
}
</script>
