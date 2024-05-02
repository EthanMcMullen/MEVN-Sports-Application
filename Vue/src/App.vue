<template>
  <div id="layout">
    <header class="navbar is-success" style="border-bottom: 3px solid #050;">
      <div class="container">
        <div class="navbar-brand is-flex">
          <p class="navbar-item">BVG Sports Scheduler</p>
          <RouterLink to="/" class="navbar-item">Home</RouterLink>
          <RouterLink to="/schedule" class="navbar-item">Schedule</RouterLink>
          <RouterLink v-if="checkRole === 'admin'" to="/admin" class="navbar-item">Admin</RouterLink>
          <RouterLink v-if="!isLoggedIn" to="/login" class="navbar-item">Login</RouterLink>
          <a v-if="isLoggedIn" @click="logout" class="navbar-item">Logout</a>
        </div>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import store from './stores'
import AuthService from '@/services/AuthService';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    checkRole() {
      try {
        let token = localStorage.getItem('token')
        token = AuthService.decodeToken(token)
        return token.role
      } catch (error) {
        return "user"
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logoutUser')
      location.reload();
    },
  }
};
</script>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
