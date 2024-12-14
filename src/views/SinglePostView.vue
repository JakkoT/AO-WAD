<template>
  <div>
    <HeaderComp></HeaderComp>
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
                  v-model="this.header"
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
                  v-model="this.content"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="updatePost">Update post</button>
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
  name: "SinglePost",
  components: {
    DropdownMenu,
    HeaderComp,
    FooterComp,
  },
  data: function () {
    return {
      content: "",
      header: "",
    };
  },
  computed: {},

  methods: {
    updatePost() {
      fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
      .catch((err) => console.log(err.message));

    fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.content = data.body;
        this.header = data.title;
        console.log(this.content);
        console.log(this.header);
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
};
</script>

<style></style>
