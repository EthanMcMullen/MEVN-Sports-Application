<template>
    <div class="login">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title">Login</h1>
            <div class="box">
              <form @submit.prevent="login">
                <div class="field">
                  <label for="email" class="label">Email</label>
                  <div class="control">
                    <input id="email" class="input" type="email" v-model="email" placeholder="Enter your email" required>
                  </div>
                </div>
                <div class="field">
                  <label for="password" class="label">Password</label>
                  <div class="control">
                    <input id="password" class="input" type="password" v-model="password" placeholder="Enter your password" required>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button type="submit" class="button is-primary">Login</button>
                  </div>
                </div>
              </form>
            </div>
            <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
          </div>
        </div>
      </div>
    </section>
    </div>
  </template>
  
  <script>
  </script>
  
  <style>
  /* Add any additional CSS styling here if needed */
  </style>
  