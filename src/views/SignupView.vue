<template>
  <div class="page-container">
    <HeaderComp></HeaderComp>
    <div class="form-container">
      <form @submit.prevent="SignUp">
        <table>
          <tbody>
            <!-- Email Row -->
            <tr>
              <td class="label-cell"><label for="email">Email</label></td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  required
                />
              </td>
            </tr>

            <!-- Password Row -->
            <tr>
              <td class="label-cell"><label for="password">Password</label></td>
              <td>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  @input="validatePassword"
                  required
                />
              </td>
            </tr>

            <!-- Error Message -->
            <tr v-if="errorMessage">
              <td colspan="2" class="error-cell">
                <p class="error">{{ errorMessage }}</p>
              </td>
            </tr>

            <!-- Signup Button -->
            <tr>
              <td colspan="2" class="button-cell">
                <button type="submit" :disabled="!validPass">Signup</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "SignupView",
  components: {
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

      if (password.length < 8 || password.length > 15) {
        errors.push("Password must be between 8 and 15 characters.");
      }
      if (!/^[A-Z]/.test(password)) {
        errors.push("Password must start with an uppercase letter.");
      }
      if (!/[0-9]/.test(password)) {
        errors.push("Password must include at least one number.");
      }
      if ((password.match(/[a-z]/g) || []).length < 2) {
        errors.push("Password must include at least two lowercase letters.");
      }
      if (!/_/.test(password)) {
        errors.push('Password must include the character "_".');
      }

      this.validPass = errors.length === 0;
      this.errorMessage = errors.length ? errors.join(" ") : "";
    },
    SignUp() {
      const data = { email: this.email, password: this.password };
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => this.$router.push("/"))
        .catch((e) => console.error(e));
    },
  },
};
</script>

<style scoped>
/* Centered form container with light green background */
.form-container {
  background-color: #f0f4e8; /* Light green background */
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* Center horizontally */
}

/* Table styling for side-by-side alignment */
table {
  width: 100%;
  border-spacing: 10px;
}

/* Label styling */
.label-cell {
  text-align: left;
  font-weight: bold;
  color: #333;
  width: 30%; /* Fixed width for labels */
}

/* Input fields */
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* Error messages */
.error-cell {
  text-align: center;
}
.error {
  color: red;
  font-size: 0.9em;
}

/* Signup button */
.button-cell {
  text-align: center;
}
button {
  background-color: #4a90e2;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  background-color: #a0c4ff;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #357ab8;
}
</style>