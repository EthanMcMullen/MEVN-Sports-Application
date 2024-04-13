<template>
    <section class="section">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title">Register</h1>
            <div class="box">
              <form>
                <div class="field">
                  <label for="email" class="label">Email</label>   
                  <input id="email" class="input" type="email" placeholder="Enter your email" v-model="user.email">
                </div>
                <div class="field">
                  <label for="password" class="label">Password</label>     
                    <input id="password" class="input" type="password" placeholder="Enter your password" v-model="user.password">
                </div>
                <div class="field">
                    <button class="button button-large full-width is-primary" type="button" @click="addToAPI">Register</button>

                </div>
              </form>
            </div>
            <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            user : {email: '', password: ''}
        }
    }, methods: {
      async addToAPI() {

        let newUser = {
                email : this.user.email,
                password : this.user.password,
                role : 'user',
            }

        const resp = await axios.post('http://localhost:3000/auth/register', newUser,
      {
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
      });
        console.log(resp.data)
      
      }
    }
    
}
</script>
  

  
