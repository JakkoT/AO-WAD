<template>
  <div>
    <HeaderComp></HeaderComp>
    <!--
    <nav>
      <router-link to="/">HOME</router-link>
      -->
    <!-- The Router gets us to index.html ("Home" in the vue project) -->
    <!--
      <img
        class="logo"
        id="logo"
        src="@/assets/icon.png"
        width="50"
        height="50"
        alt="User icon"
      />
    -->
    <!-- The Dropdownmenu component -->
    <!--
      <DropdownMenu />
    </nav>
-->

    <div class="form-container">
      <h1>Add a New Post</h1>
      <!-- <form action="index.html" method="GET"> -->

      <!--
            Prevent reloading of the page. Actual posting logic is not implemented!! It just redirects to path "/"
            -->
      <form @submit.prevent="createPost">
        <table>
          <tbody>
            <tr>
              <td><label for="content">Post header</label></td>
              <td>
                <textarea
                  id="header"
                  name="header"
                  rows="2"
                  required
                  placeholder="The text for your header..."
                  v-model="header"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td><label for="content">Post body</label></td>
              <td>
                <textarea
                  id="content"
                  name="content"
                  rows="5"
                  required
                  placeholder="The text for your post..."
                  v-model="content"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          @click="createPost"
          :disabled="!filled_content || !filled_header || isSubmitting"
        >
          Create post
        </button>
      </form>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "AddPostView",
  components: {
    DropdownMenu,
    HeaderComp,
    FooterComp,
  },
  data: function () {
    return {
      content: "",
      header: "",
      filled_content: false,
      filled_header: false,
      isSubmitting: false,
    };
  },
  watch: {
    content: function () {
      this.filled_content = this.content.length > 0;
    },
    header: function () {
      this.filled_header = this.header.length > 0;
    },
  },

  methods: {
    createPost() {
      if (this.isSubmitting) return; // Prevent duplicate submissions
      this.isSubmitting = true;
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: this.header,
          body: this.content,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
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
      .catch((err) => console.log(err.message))
      .finally(() => {
        this.isSubmitting = false; // Reset the flag
      });
  },
};
</script>

<style>
@import "@/styles/addPost.css";
</style>
