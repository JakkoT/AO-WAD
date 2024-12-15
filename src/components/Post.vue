<template>
  <div class="post" @click="goToPost">
    <!-- Header Row: Icon and Date -->
    <div class="post-header">
      <img
        class="user-icon"
        src="@/assets/icon.png"
        alt="User icon"
        width="30"
        height="30"
      />
      <span class="post-date">{{ json.date }}</span>
    </div>

    <!-- Content Section -->
    <div class="post-content">
      <p class="post-title">{{ json.title }}</p>
      <p class="post-body">{{ json.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: Object,
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
.post {
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Header Row: Icon and Date */
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-icon {
  display: inline-block;
}

.post-date {
  font-weight: bold;
  color: #333;
}

/* Content Section */
.post-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align title and body to the left */
}

.post-title {
  font-weight: bold;
  font-size: 1.2em;
  margin: 5px 0;
}

.post-body {
  margin: 5px 0;
  font-size: 1em;
  color: #444;
}
</style>
