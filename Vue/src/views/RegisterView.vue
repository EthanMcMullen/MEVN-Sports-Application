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
                  
                    <input id="email" class="input" type="email" placeholder="Enter your email" required v-model="user.email">
                  
                </div>
                <div class="field">
                  <label for="password" class="label">Password</label>
                  
                    <input id="password" class="input" type="password" placeholder="Enter your password" required v-model="user.password">
                  
                </div>
                <div class="field">
                  
                    <button type="submit" class="button is-primary" @click="addToAPI">Register</button>
                  
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
        addToAPI(){
            let newUser = {
                email : this.user.email,
                password : this.user.password,
            }
            console.log(newUser);
            axios.post('http://localhost:3000/auth/register', {
                email : newUser.email,
                password : newUser.password,
                role : 'user'
            })

            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        }
    }
    
}
</script>
  
  <style>
  /* Add any additional CSS styling here if needed */
  </style>
  