<template>
  <div id="app">
    <b-navbar wrapper-class="container" shadow>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          karaoke-app
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">Sign up</a>
            <a class="button is-light">Login</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss"></style>
