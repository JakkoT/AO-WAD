<template>
  <div class="body">
    <HeaderComp></HeaderComp>

    <main>
      <div class="sidebar"></div>

      <!-- Middle Content -->
      <div id="middle" class="content">
        <!-- Top Bar: Logout Button Centered -->
        <div class="top-bar">
          <button class="logout-button" @click="logout">Logout</button>
        </div>

        <div class="posts-container">
          <template v-if="posts.length > 0">
            <!-- Display posts if available -->
            <Post v-for="post in posts" :key="post.id" :json="post" />
          </template>
          <template v-else>
            <!-- Display this message when there are no posts -->
            <div class="no-posts-message">
              <p>No posts available. Click "Add Post" to create a new one!</p>
            </div>
          </template>
        </div>

        <!-- Bottom Buttons: Add Post & Delete All -->
        <div class="button-container">
          <button class="action-button" @click="goToAddPost">Add post</button>
          <button class="action-button delete" @click="deleteAllPosts">Delete all</button>       </div>
      </div>

      <div class="sidebar"></div>
    </main>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import Post from "@/components/Post.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      authenticated: false,
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
    // Logout method
    logout() {
      fetch("http://localhost:3000/auth/logout", { method: "GET", credentials: "include" })
        .then(() => {
          localStorage.removeItem("token"); // Remove any token
          this.authenticated = false; // Update state
          this.$router.push("/login"); // Redirect to login page
        })
        .catch((err) => console.error("Logout failed:", err.message));
    },

    // Navigate to Add Post page
    goToAddPost() {
      this.$router.push("/add-post");
    },

    // Delete all posts
    deleteAllPosts() {
  // Send DELETE request to the backend
  fetch("http://localhost:3000/api/posts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Clear posts in the frontend
        this.posts = [];
      } else {
        alert("Failed to delete posts. Please try again.");
      }
    })
    .catch((err) => {
      console.error("Error deleting posts:", err.message);
      alert("An error occurred while trying to delete all posts.");
    });
},
// Check if user is authenticated
  checkAuthentication() {
      fetch("http://localhost:3000/auth/authenticate", { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            this.authenticated = true;
            this.fetchPosts(); // Fetch posts if authenticated
          } else {
            this.authenticated = false;
            this.$router.push("/login"); // Redirect to login page
          }
        })
        .catch((err) => {
          console.error("Error authenticating:", err.message);
          this.$router.push("/login");
        });
    }
  },
  mounted() {
    // Authentication check and fetch posts
    fetch("http://localhost:3000/auth/authenticate", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (!data.authenticated) this.$router.push("/login");
      })
      .catch((err) => console.error(err.message));

    this.fetchPosts();
  },
};
</script>

<style scoped>
/* General Button Styling */
button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
}

/* Top Bar for Logout Button */
.top-bar {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
  height: 20px;           /* Fixed height */
  margin: 20px 0;          /* Add spacing */
}

/* Logout Button */
.logout-button {
  background-color: #4a90e2; /* Blue color */
}

.logout-button:hover {
  background-color: #357ab8;
}

/* Action Buttons (Add Post & Delete All) */
.button-container {
  display: flex;
  justify-content: center;
  gap: 200px; /* Space between buttons */
  margin-top: 20px;
}

.action-button {
  background-color: #4a90e2;
}

.action-button:hover {
  background-color: #357ab8;
}

/* Delete Button Specific Styling */
.action-button.delete {
  background-color: #4a90e2; /* Red color */
}

.action-button.delete:hover {
  background-color: #357ab8;
}

.no-posts-message {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #888;
}
</style>