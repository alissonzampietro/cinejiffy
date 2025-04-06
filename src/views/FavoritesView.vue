<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { getImageUrl } from '@/services/movies.service'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'

const store = useMovieStore()

onMounted(() => {
  store.loadGenres()
})
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Favorite Movies</h1>

    <LoadingSpinner v-if="store.loading" />

    <div v-else-if="store.error" class="text-red-500 text-center">
      {{ store.error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="movie in store.movies.filter(m => store.isFavorite(m.id))" :key="movie.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <MovieCard :movie="movie" />
      </div>
    </div>

    <div data-cy="no-favorites-message" v-if="!store.loading && store.movies.filter(m => store.isFavorite(m.id)).length === 0" class="text-center text-gray-500 mt-8">
      No favorite movies yet. Browse movies and add them to your favorites!
    </div>
  </main>
</template>
