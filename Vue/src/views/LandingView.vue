<template>
  <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

    <section class="hero has-background-success-light is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Welcome to the Bayview Glen Sports Scheduler
          </h1>
          <h2 class="subtitle">
            An Interactive Website for Sports Scheduling
          </h2>
          <router-link to="/schedule" class="button is-success is-large">Get Started</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
const goToSchedule = () => {};
</script>

<style>
.hero.is-primary {
  background-color: #00d1b2;
}
</style>
