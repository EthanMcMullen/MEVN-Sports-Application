<template>
    <div class="entry-view">
      <h1>Welcome to Your Application!</h1>
      <p>
        This is a brief introduction to your application. You can provide some information
        about what the application does, its main features, and how users can get started.
      </p>
      <p>
        Feel free to customize this view to fit your application's branding and style.
      </p>
      <button @click="goToHome" class="button is-primary">Get Started</button>
    </div>
  </template>
  
  <style>
  .entry-view {
    margin: 20px;
    text-align: center;
  }
  
  .entry-view h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  .entry-view p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .entry-view button {
    margin-top: 20px;
  }
  </style>
  