<template>
  <section class="section">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title">Login</h1>
            <div class="box">
                  <form @submit.prevent="login">
                    <div class="field">
                      <label for="email" class="label">Email:</label>
                      <input type="email" class="input" id="email" placeholder="Enter your email" v-model="email" required>
                    </div>
                    <div class="field">
                      <label for="password" class="label">Password:</label>
                      <input type="password" class="input" id="password" placeholder="Enter your password" v-model="password" required>
                    </div>
                    <div class="feild">
                      <button class="button is-primary" type="submit">Login</button>
                    </div>
                  </form>
                  <p v-if="loginError" class="error-message">{{ loginError }}</p>
              </div>
            <p>Dont have an account? <router-link to="/register">Register</router-link></p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        loginError: null
      };
    },
    methods: {
      ...mapActions(['loginUser']),
      async login() {
        try {
          
          // await this.loginUser({ email: this.email, password: this.password });
          await this.$store.dispatch('loginUser', { email: this.email, password: this.password });

          // If login successful, redirect to dashboard or desired page
          this.$router.push({ name: 'home' });
        } catch (error) {
          this.loginError = 'Failed to login. Please check your credentials and try again.';
        }
        
      }
    }
  };
  </script>

