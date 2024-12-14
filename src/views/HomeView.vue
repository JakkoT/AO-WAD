<template>
  <div class="body">
    <HeaderComp></HeaderComp>

    <main>
      <div class="sidebar"></div>
      <div v-if="posts.length > 0" id="middle">
        <Post v-for="post in posts" :key="post.id" :json="post" />
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

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
    };
  },
  components: {
    DropdownMenu,
    Post,
    HeaderComp,
    FooterComp,
  },
  methods: {
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    fetch(`http://localhost:3000/auth/authenticate`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.authenticated) {
          console.log("authenticated");
        } else {
          console.log("not authenticated");
          this.$router.push("/login");
        }
      })
      .catch((err) => console.log(err.message));
    this.fetchPosts();
    console.log("mounted");
  },
};
</script>

<style scoped>
@import "@/styles/index.css";
.reset-likes-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3a35da;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}
.reset-button:hover {
  background-color: #171774;
}
</style>
