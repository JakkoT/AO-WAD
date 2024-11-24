import { createStore } from "vuex";
import postsJSON from "@/assets/posts.json";

// Helper function to format timestamps
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default createStore({
  state: {
    posts: {}, // Stores individual posts by ID
  },
  getters: {
    getPost: (state) => (id) => state.posts[id],
    getAllPosts: (state) => Object.values(state.posts),
  },
  mutations: {
    // Mutation to set all posts in the state
    setPosts(state, posts) {
      // Store posts in an object keyed by their IDs
      state.posts = posts.reduce((acc, post) => {
        acc[post.id] = {
          ...post,
          likes: post.likes || 0, // Ensure likes are initialized
          formattedDate: formatTimestamp(post.createTime), // Format the timestamp
        };
        return acc;
      }, {});
    },
    INCREMENT_LIKES(state, postId) {
      if (state.posts[postId]) {
        state.posts[postId].likes += 1;
      }
    },
    RESET_LIKES(state) {
      for (const postId in state.posts) {
        state.posts[postId].likes = 0;
      }
    },
  },
  actions: {
    // Action to fetch all posts
    async fetchAllPosts({ commit }) {
      try {
        const posts = await postsJSON;
        commit("setPosts", posts);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    },
    incrementLikes({ commit }, postId) {
      commit("INCREMENT_LIKES", postId);
    },
    resetLikes({ commit }) {
      commit("RESET_LIKES");
    },
    // Action to refetch all posts if a new one is added
    async refetchPosts({ dispatch }) {
      await dispatch("fetchAllPosts");
    },
  },
  modules: {},
});
