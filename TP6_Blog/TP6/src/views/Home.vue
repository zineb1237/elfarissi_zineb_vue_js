<template>
  <div class="home">
    <PostList :posts="posts" />
    <TagCloud :posts="posts" />
  </div>
</template>

<script>
import getPosts from "../composables/getPosts"
import PostList from "../components/PostList.vue"
import TagCloud from "../components/TagCloud.vue"

export default {
  components: { PostList, TagCloud },
  setup() {
    const { posts, load } = getPosts()
    load()
    return { posts }
  }
}
</script>
