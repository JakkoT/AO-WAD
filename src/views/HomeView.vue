<template>
  <div class="body">
    <HeaderComp></HeaderComp>

    <main>
      <div></div>
      <div id="middle">
        <PostList />
        <!-- The postlist component - all of our posts from json -->
      </div>
      <div></div>
    </main>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
// The view uses dropdownmenu and postlist components, we need to import them and export them for vue
import DropdownMenu from "@/components/DropdownMenu.vue";
import PostList from "@/components/PostList.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "HomeView",
  components: {
    DropdownMenu,
    PostList,
    HeaderComp,
    FooterComp,
  },
};
</script>

<style scoped>
/* scoped - The style only applies here and doesn't extend elsewhere */
@import "@/styles/index.css";
</style>
