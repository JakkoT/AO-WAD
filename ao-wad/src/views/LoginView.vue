<template>
    <div>
        <nav>
            <router-link to="/">HOME</router-link>
            <img class="logo" id="logo" src="@/assets/icon.png" width="50" height="50" alt="User icon">

            <!-- The Dropdownmenu component -->
            <DropdownMenu />
        </nav>

        <div class="form-container">
            <h1>Welcome to PostIt</h1>
            <!-- <form action="index.html" method="GET"> -->
            <!--
            Prevent reloading of the page. No authentication logic is implemented!! It just redirects to path "/"
            -->
            <form @submit.prevent="login">
                <table class="login">
                    <tr>
                        <td>
                            <a href="#">Create an account</a>
                            <p>or</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Please log in</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="email" class="login-form" alt="Email" placeholder="Email" required>
                            <input type="password" class="login-form" alt="Password" placeholder="Password" required>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Log in</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#">Forgot password</a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

    </div>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
    name: "LoginView",
    components: {
        DropdownMenu
    },
    methods: {
        login() {
            // Go back to the home view
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
@import "@/styles/login.css";
</style>