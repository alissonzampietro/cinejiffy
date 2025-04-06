
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/" data-cy="home-link"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /></RouterLink>

    <div class="wrapper">
      <nav>
        <RouterLink to="/" data-cy="home-link">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.logo {
  background: #fff;
  display: block;
  margin: 0 auto 2rem;
}
</style>
