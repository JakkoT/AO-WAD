<template>
    <div class="body">
        <nav>
            <!-- Router gets us to pages - defined in router/index.js -->
            <router-link to="/">Home</router-link>
            <p>|</p>
            <router-link to="/add-post">Add Post</router-link>
            <p>|</p>
            <router-link to="/login">Login</router-link>
            <img class="logo" id="logo" src="@/assets/icon.png" width="50" height="50" alt="User icon" />

            <!-- The Dropdownmenu component -->
            <DropdownMenu />
        </nav>
        <main>
            <div></div>
            <div id="middle">
                <PostList /> <!-- The postlist component - all of our posts from json -->
            </div>
            <div></div>
        </main>
        <footer></footer>
    </div>
</template>

<script>
// The view uses dropdownmenu and postlist components, we need to import them and export them for vue
import DropdownMenu from "@/components/DropdownMenu.vue";
import PostList from "@/components/PostList.vue";

export default {
    name: "HomeView",
    components: {
        DropdownMenu,
        PostList
    }
};
</script>

<style scoped>
/* scoped - The style only applies here and doesn't extend elsewhere */
@import "@/styles/index.css";
</style>