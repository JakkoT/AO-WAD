<template>
  <!--
    All the posts in HomeView.vue (previously index.html)
    -->
  <!-- Loop through the posts array show all the posts -->
  <div v-for="post in posts" :key="post.id" class="post">
    <table>
      <tbody>
        <tr>
          <td>
            <img
              src="@/assets/icon.png"
              alt="User icon"
              width="30"
              height="30"
            />
          </td>
          <td>
            <p>{{ post.createTime }}</p>
          </td>
        </tr>
        <!-- Check if the image exists and only then try to show it -->
        <tr v-if="post.image">
          <td colspan="3">
            <!--
                    The backticks ` are necessary because they support "string interpolation"
                    That means javascript constructs the string literal and passes it in as an argument.
                    We have javascript construct the string so we don't have to deal with making a correct path ourselves :)
                    -->
            <img
              class="postimg"
              :src="require(`@/assets/${post.image}`)"
              alt="Post image"
            />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <p>{{ post.content }}</p>
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="require(`@/assets/${post.reaction}`)"
              alt="Reaction"
              width="25"
              height="25"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import posts from "@/assets/posts.json"; // Array of our posts (used in template)

export default {
  // Export it to vue
  name: "PostList", // This is optional
  data() {
    return {
      posts,
    };
  },
};
</script>

<style>
@import "@/styles/index.css";
td {
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: left;
  text-align: left;
}
</style>
