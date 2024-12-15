<template>
  <div>
    <HeaderComp></HeaderComp>
    <div class="form-container">
      <form @submit.prevent="login">
        <!-- Email Row -->
        <div class="form-row">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>

        <!-- Password Row -->
        <div class="form-row">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>

        <!-- Buttons Row -->
        <div class="button-row">
          <button class="action-button login" type="submit">Login</button>
          <router-link to="/signup" class="action-button signup"
            >Signup</router-link
          >
        </div>
      </form>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "LoginView",
  components: { HeaderComp, FooterComp },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const data = { email: this.email, password: this.password };
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => location.assign("/"))
        .catch((e) => console.error(e));
    },
  },
};
</script>

<style scoped>
/* Container for centering the form */
.form-container {
  background-color: #f4f7ea;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
  margin: 50px auto;
}

/* Rows for inputs */
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
  color: #333;
  width: 30%;
}

input {
  width: 65%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Buttons Row */
.button-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  gap: 10px; /* Space between elements */
}

/* Buttons */
.action-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  color: white;
  cursor: pointer;
  text-align: center;
  display: inline-block;
}

.login {
  background-color: #4a90e2;
}

.signup {
  background-color: #4a90e2;
}

.login:hover,
.signup:hover {
  background-color: #357ab8;
}
</style>