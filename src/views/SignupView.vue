<template>
  <div>
    <HeaderComp></HeaderComp>
    <div class="form-container">
      <h1>Welcome to PostIt signup</h1>
      <!-- <form action="index.html" method="GET"> -->
      <!--
              Prevent reloading of the page. No authentication logic is implemented!! It just redirects to path "/"
              -->
      <form @submit.prevent="login">
        <table class="login">
          <tbody>
            <tr>
              <td>
                <p>Please sign up</p>
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
                  @input="validatePassword"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" :disabled="!validPass">Sign up</button>
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
  components: {
    DropdownMenu,
    HeaderComp,
    FooterComp,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      validPass: false,
    };
  },

  methods: {
    validatePassword() {
      const password = this.password;

      const errors = [];

      // Length check
      if (password.length < 8 || password.length > 15) {
        errors.push("Password must be between 8 and 15 characters.");
      }

      // Must start with an uppercase letter
      if (!/^[A-Z]/.test(password)) {
        errors.push("Password must start with an uppercase alphabet.");
      }

      // Must include at least one numeric value
      if (!/[0-9]/.test(password)) {
        errors.push("Password must include at least one numeric value.");
      }

      // Must include at least one uppercase alphabet
      if (!/[A-Z]/.test(password)) {
        errors.push(
          "Password must include at least one uppercase alphabet character."
        );
      }

      // Must include at least two lowercase alphabet characters
      if ((password.match(/[a-z]/g) || []).length < 2) {
        errors.push(
          "Password must include at least two lowercase alphabet characters."
        );
      }

      // Must include the character "_"
      if (!/_/.test(password)) {
        errors.push('Password must include the character "_".');
      }

      // Update validation state
      this.validPass = errors.length === 0;
      this.errorMessage =
        errors.length > 0
          ? `The password is not valid - ${errors.join(" ")}`
          : "";
    },
  },
};
</script>

<style scoped>
@import "@/styles/login.css";

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 0.5em;
}
</style>
