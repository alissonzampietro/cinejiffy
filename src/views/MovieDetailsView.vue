<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getImageUrl } from '@/services/movies.service'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'

const route = useRoute()
const store = useMovieStore()

onMounted(async () => {
  const movieId = Number(route.params.id)
  loadMovieDetails(movieId)
})

const loadMovieDetails = async (movieId: number) => {
  if (!isNaN(movieId)) {
    await store.loadMovieDetails(movieId)
  }
}

watch(
  () => route.params.id,
  async (newId) => {
    await loadMovieDetails(Number(newId))
  }
)
</script>

<template>
    <LoadingSpinner v-if="store.loading" fullScreen />

    <!-- Error State -->
    <div v-else-if="store.error" data-cy="error-message" class="text-red-500 text-center">
      {{ store.error }}
    </div>

    <!-- Movie Details -->
    <div v-else-if="store.selectedMovie" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Backdrop Image -->
      <div class="relative h-96">
        <img
          :src="getImageUrl(store.selectedMovie.backdrop_path, 'original')"
          :alt="store.selectedMovie.title"
          data-cy="movie-backdrop"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-8 text-white">
          <h1 class="text-4xl font-bold mb-2" data-cy="movie-title">{{ store.selectedMovie.title }}</h1>
          <p class="text-lg opacity-90" data-cy="movie-tagline">{{ store.selectedMovie.tagline }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        <!-- Left Column: Poster and Quick Info -->
        <div>
          <img
            :src="getImageUrl(store.selectedMovie.poster_path)"
            :alt="store.selectedMovie.title"
            class="w-full rounded-lg shadow-lg mb-4"
          >
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-gray-700">Release Date</h3>
              <p data-cy="release-date">{{ new Date(store.selectedMovie.release_date).toLocaleDateString() }}</p>
            </div>
            <div>
              <h3 class="font-semibold text-gray-700">Runtime</h3>
              <p>{{ store.selectedMovie.runtime }} minutes</p>
            </div>
            <div>
              <h3 class="font-semibold text-gray-700">Rating</h3>
              <div class="flex items-center">
                <span class="text-yellow-500 mr-1">★</span>
                <span data-cy="rating">{{ store.selectedMovie.vote_average.toFixed(1) }}</span>
                <span class="text-gray-500 ml-2">({{ store.selectedMovie.vote_count }} votes)</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-gray-700">Status</h3>
              <p>{{ store.selectedMovie.status }}</p>
            </div>
            <button
              @click="store.toggleFavorite(store.selectedMovie.id)"
              class="w-full px-4 py-2 mt-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              :class="store.isFavorite(store.selectedMovie.id) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
            >
              <span class="text-xl">{{ store.isFavorite(store.selectedMovie.id) ? '♥' : '♡' }}</span>
              <span>{{ store.isFavorite(store.selectedMovie.id) ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
            </button>
          </div>
        </div>

        <!-- Middle Column: Overview and Details -->
        <div class="md:col-span-2">
          <h2 class="text-2xl font-bold mb-4">Overview</h2>
          <p class="text-gray-700 mb-8" data-cy="movie-overview">{{ store.selectedMovie.overview }}</p>

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold mb-2">Genres</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in store.selectedMovie.genres"
                  :key="genre.id"
                  data-cy="genres"
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>

            <div v-if="store.selectedMovie.homepage">
              <h3 class="text-xl font-semibold mb-2">Official Website</h3>
              <a
                :href="store.selectedMovie.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
            </div>

            <div v-if="store.selectedMovie.budget > 0 || store.selectedMovie.revenue > 0">
              <h3 class="text-xl font-semibold mb-2">Box Office</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="store.selectedMovie.budget > 0">
                  <p class="text-gray-600">Budget</p>
                  <p class="text-lg">${{ store.selectedMovie.budget.toLocaleString() }}</p>
                </div>
                <div v-if="store.selectedMovie.revenue > 0">
                  <p class="text-gray-600">Revenue</p>
                  <p class="text-lg">${{ store.selectedMovie.revenue.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Movies -->
      <div class="p-8 bg-gray-50">
        <h2 class="text-2xl font-bold mb-6">Similar Movies</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="movie in store.similarMovies.slice(0, 5)"
            :key="movie.id"
            class="bg-white rounded-lg shadow overflow-hidden group"
          >
            <MovieCard :movie="movie" className="w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <router-link
      to="/"
      data-cy="back-button"
      class="fixed bottom-8 right-8 bg-black text-white cursor-pointer px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black"
    >
      Back to List
    </router-link>
</template>
