<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';
import { onMounted, ref } from 'vue'

const movieStore = useMovieStore()

onMounted(async () => {
  await movieStore.fetchMovies()
})


</script>

<template>
  <main>
    <h1>Movie List</h1>

    <div v-if="movieStore.loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="movie in movieStore.movies.results" :key="movie">
          {{ movie.title }}
        </li>
      </ul>
    </div>
  </main>
</template>
