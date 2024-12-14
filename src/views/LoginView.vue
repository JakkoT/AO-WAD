<template>
  <div>
    <HeaderComp></HeaderComp>
    <!--
    <nav>
      <router-link to="/">HOME</router-link>
      <img
        class="logo"
        id="logo"
        src="@/assets/icon.png"
        width="50"
        height="50"
        alt="User icon"
      />

      
      <DropdownMenu />
    </nav>
-->
    <div class="form-container">
      <h1>Welcome to PostIt</h1>
      <!-- <form action="index.html" method="GET"> -->
      <!--
            Prevent reloading of the page. No authentication logic is implemented!! It just redirects to path "/"
            -->
      <form @submit.prevent="login">
        <table class="login">
          <tbody>
            <tr>
              <td>
                <router-link to="/signup">Create an account</router-link>
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
                <input
                  type="email"
                  class="login-form"
                  alt="Email"
                  placeholder="Email"
                  required
                  v-model="email"
                />
                <input
                  type="password"
                  class="login-form"
                  alt="Password"
                  placeholder="Password"
                  required
                  v-model="password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button @click="login">Log in</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "LoginView",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    DropdownMenu,
    HeaderComp,
    FooterComp,
  },
  methods: {
    login() {
      var data = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>

<style scoped>
@import "@/styles/login.css";
</style>
