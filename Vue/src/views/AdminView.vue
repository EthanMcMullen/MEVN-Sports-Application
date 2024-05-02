<script setup>
import TeamPost from '@/components/TeamPost.vue';
import GamePost from '@/components/GamePost.vue';
import LeaguePost from '@/components/LeaguePost.vue';
import { ref } from 'vue'

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">


  <div class="home" v-if="checkRole === 'admin'">

    <div class="columns">
      <div class="column">
        <LeaguePost/>
      </div>
      <div class="column">
        <TeamPost />
      </div>
      <div class="column">
        <GamePost />
      </div>
    </div>

    
    
  </div>

</template>

<script>

import AuthService from '@/services/AuthService';

export default {
  
  computed: {
    checkRole(){
      try {
        let token = localStorage.getItem('token')
        token = AuthService.decodeToken(token)
        console.log(token.role)
        if(token.role === 'admin') {
          return token.role
        }
        this.$router.push({ name: 'home' });
      } catch (error) {
        return "user"
      }
    },
    
    
    
  },
};
      
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
