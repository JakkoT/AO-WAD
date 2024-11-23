<template>
    <div>
        <nav>
            <router-link to="/">HOME</router-link>
            <!-- The Router gets us to index.html ("Home" in the vue project) -->>

            <img class="logo" id="logo" src="@/assets/icon.png" width="50" height="50" alt="User icon">

            <!-- The Dropdownmenu component -->
            <DropdownMenu />
        </nav>

        <div class="form-container">
            <h1>Add a New Post</h1>
            <!-- <form action="index.html" method="GET"> -->

            <!--
            Prevent reloading of the page. Actual posting logic is not implemented!! It just redirects to path "/"
            -->
            <form @submit.prevent="createPost">
                <table>
                    <tr>
                        <td><label for="content">Post body</label></td>
                        <td><textarea id="content" name="content" rows="5" required
                                placeholder="The text for your post..."></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="file-upload">Select file</label></td>
                        <td>
                            <label for="file-upload" class="custom-file-input">Choose File</label>
                            <input type="file" id="file-upload">
                        </td>
                    </tr>
                </table>
                <button type="submit">Create post</button>
            </form>
        </div>

    </div>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
    name: "AddPostView",
    components: {
        DropdownMenu
    },
    /*data() { // Post need default content and file if none are provided
        content: "",
            file: null
    },*/
    methods: {
        createPost() {
            // Go back to HomeView.vue (previously index.html page) - to do anything with the file etc. add to here!
            this.$router.push("/");
        }
    }
};

</script>

<style scoped>
@import "@/styles/addPost.css";
</style>