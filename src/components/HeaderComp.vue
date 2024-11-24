<template>
  <nav>
    <!-- Router gets us to pages - defined in router/index.js -->
    <router-link to="/">Home</router-link>
    <p>|</p>
    <router-link to="/add-post">Add Post</router-link>
    <p>|</p>
    <router-link to="/login">Login</router-link>
    <p>|</p>
    <router-link to="/signup">Sign up</router-link>
    <img
      class="logo"
      id="logo"
      src="@/assets/icon.png"
      width="50"
      height="50"
      alt="User icon"
    />

    <!-- The Dropdownmenu component -->
    <DropdownMenu />
  </nav>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  name: "Header",
  components: {
    DropdownMenu,
  },
};
</script>

<style></style>
