import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AddPostView from "@/views/AddPostView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";

const routes = [
  // All the routes and their views (previously index.html, addPost.html and login.html)
  { path: "/", name: "Home", component: HomeView },
  { path: "/add-post", name: "AddPost", component: AddPostView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/signup", name: "Signup", component: SignupView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;