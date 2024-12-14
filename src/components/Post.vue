<template>
  <div class="post" @click="goToPost">
    <table>
      <tbody>
        <tr class="header-row">
          <td class="user-icon-cell">
            <img
              class="user-icon"
              src="@/assets/icon.png"
              alt="User icon"
              width="30"
              height="30"
            />
          </td>
        </tr>
        <!-- Check if the image exists and only then try to show it -->

        <tr>
          <td colspan="3">
            <p class="post-content">{{ json.date }}</p>
            <p class="post-content">{{ json.title }}</p>
            <p class="post-content">{{ json.body }}</p>
            <p class="post-content">{{ json.id }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: JSON,
      required: true,
    },
  },
  methods: {
    goToPost() {
      this.$router.push(`/post/${this.json.id}`);
    },
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
