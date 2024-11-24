<template>
  <div class="post">
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // Get the specific post from Vuex
    const post = computed(() => store.getters.getPost(props.id));

    // Ensure post data is available
    onMounted(() => {
      if (!post.value) {
        console.log(`Post with ID ${props.id} not found`);
      }
    });

    return {
      post,
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
