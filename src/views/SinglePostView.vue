<template>
  <div>
    <HeaderComp></HeaderComp>
    <div class="form-container">
      <h1>A Post</h1>
      <form @submit.prevent="updatePost">
        <table>
          <tbody>
            <tr>
              <td><label for="header">Body</label></td>
              <td>
                <input
                  id="header"
                  type="text"
                  name="header"
                  v-model="header"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-container">
          <button class="update-button" type="submit">Update</button>
          <button class="delete-button" type="button" @click="deletePost">
            Delete
          </button>
        </div>
      </form>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "SinglePost",
  components: {
    HeaderComp,
    FooterComp,
  },
  data() {
    return {
      content: "", // Post body
      header: "", // Post title
    };
  },
  methods: {
    // Fetch the post when the page loads
    fetchPost() {
      fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          this.header = data.title;
          this.content = data.body;
        })
        .catch((e) => {
          console.error("Error fetching post:", e.message);
        });
    },

    // Update the post
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
        .then((response) => {
          if (response.ok) {
            alert("Post updated successfully!");
            this.$router.push("/");
          } else {
            alert("Failed to update post.");
          }
        })
        .catch((e) => {
          console.error("Error updating post:", e.message);
        });
    },

    // Delete the post
    deletePost() {
      fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Post deleted successfully!");
            this.$router.push("/");
          } else {
            alert("Failed to delete post.");
          }
        })
        .catch((e) => {
          console.error("Error deleting post:", e.message);
        });
    },

    // Check if user is authenticated
    checkAuthentication() {
      fetch("http://localhost:3000/auth/authenticate", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.authenticated) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.error("Error checking authentication:", err.message);
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    this.checkAuthentication(); // Verify user authentication
    this.fetchPost(); // Fetch the specific post
  },
};
</script>

<style scoped>
.form-container {
  background-color: rgb(253, 255, 231);
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  margin: 30px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.update-button,
.delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.update-button {
  background-color: rgb(0, 38, 255);
}

.update-button:hover {
  background-color: blue;
}

.delete-button {
  background-color: rgb(0, 38, 255);
}

.delete-button:hover {
  background-color: blue;
}
</style>