<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Schedule</RouterLink> |
          <RouterLink to="/admin" v-if="checkRole === 'admin'">Admin | </RouterLink> 
          <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink>
          <RouterLink to="login" v-if="isLoggedIn" @click="logout">Logout</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import store from './stores'
import { mapActions } from 'vuex';
import AuthService from '@/services/AuthService';
import { onMounted } from 'vue';
import router from './router';


export default {
  
    computed: {
      isLoggedIn() {
        return this.$store.state.user.isLoggedIn; // Example for Vuex
      },
      username() {
        // Optionally, you can display the username if available
        return this.$store.state.user.username; // Example for Vuex
      },
      checkRole(){
        try {
          let token = localStorage.getItem('token')
          token = AuthService.decodeToken(token)
          console.log(token.role)
          return token.role
        } catch (error) {
          return "user"
        }
      },
      
      
      
    },
    methods:{
      ...mapActions(['logoutUser']),
      async logout(){
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
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
</style>
