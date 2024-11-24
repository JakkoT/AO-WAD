<template>
  <div class="post">
    <table>
      <tbody>
        <tr class="header-row">
          <td class="user-icon-cell">
            <img
              class = "user-icon"
              src="@/assets/icon.png"
              alt="User icon"
              width="30"
              height="30"
            />
          </td>
          <td class="date-cell">
            <p class="date">{{ post.formattedDate }}</p>
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
            <p class="post-content">{{ post.content }}</p>
          </td>
        </tr>
        <tr>
          <td class="likes-row">
            <img
              class="like-icon"
              :src="require(`@/assets/${post.reaction}`)"
              alt="Reaction"
              width="30"
              height="30"
              @click="likePost"
            />
            <span class="likes-count">{{ post.likes }} Likes</span>
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

    const likePost = () => {
      store.dispatch("incrementLikes", props.id); // Dispatch "incrementLikes" action
    };

    return {
      post,
      likePost,
    };
  },
};
</script>

<style scoped>
@import "@/styles/index.css";

/* Style for the overall post */
.post {
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left; /* Align post content to the left */
}
.header-row {
  display: flex;
  justify-content: space-between; /* Push user icon to the left, date to the right */
  align-items: center; 
}
.date {
  font-weight: bold;
  color: #555;
  margin: 0;
}

/* Post content */
.post-content {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-right: auto;
}

/* Post image */
.postimg {
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}
.likes-count {
  margin-left: auto; 
  font-weight: bold;
  color: #555;
}
.like-icon {
  cursor: pointer;
  margin-right: auto;
}
</style>
