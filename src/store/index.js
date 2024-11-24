import { createStore } from "vuex";
import postsJSON from "@/assets/posts.json";

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
        acc[post.id] = post;
        return acc;
      }, {});
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

    // Action to refetch all posts if a new one is added
    async refetchPosts({ dispatch }) {
      await dispatch("fetchAllPosts");
    },
  },
  modules: {},
});
