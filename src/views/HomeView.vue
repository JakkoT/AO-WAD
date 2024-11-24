<template>
  <div class="body">
    <HeaderComp></HeaderComp>

    <main>
      <div class="sidebar"></div>
      <div v-if="posts.length > 0" id="middle">
        <Post v-for="post in posts" :key="post.id" :id="post.id" />
        <!-- The postlist component - all of our posts from json -->
      </div>
      <div class="sidebar"></div>
    </main>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
// The view uses dropdownmenu and postlist components, we need to import them and export them for vue
import DropdownMenu from "@/components/DropdownMenu.vue";
import Post from "@/components/Post.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "HomeView",
  components: {
    DropdownMenu,
    Post,
    HeaderComp,
    FooterComp,
  },
  setup() {
    // This is a function that runs when the component is created
    const store = useStore();
    // Computed property for all posts
    var posts = computed(() => store.getters.getAllPosts);

    // Fetch all posts on mount
    onMounted(async () => {
      await store.dispatch("fetchAllPosts");
      console.log(store.getters.getAllPosts);
    });

    return { posts };
  },
};
</script>

<style scoped>
/* scoped - The style only applies here and doesn't extend elsewhere */
@import "@/styles/index.css";
</style>
