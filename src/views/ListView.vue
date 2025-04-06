<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { onMounted, ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'
import { SortsBy } from '@/enums/movie.enum'
import Pagination from '@/components/Pagination.vue'
import FilterBar from '@/components/FilterBar.vue'

const store = useMovieStore()
const searchQuery = ref('')
const selectedYear = ref<number | null>(null)
const selectedGenres = ref<number[]>([])
const minRating = ref(0)
const sortBy = ref<SortsBy>(SortsBy.Popularity)


// this debounced is used to don't trigger request on every input change
const debouncedSearch = debounce((query: string) => {
  store.updateFilters({ query })
}, 300)

// watch for changes in the model searchQuery
watch(searchQuery, (query) => {
  debouncedSearch(query)
})

watch([selectedYear, selectedGenres, minRating, sortBy], ([year, genres, rating, sort]) => {
  store.updateFilters({
    year,
    genres,
    minRating: rating,
    sortBy: sort
  })
})

onMounted(async () => {
  await Promise.all([
    store.loadGenres(),
    store.loadMovies()
  ])
})
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Movie Catalog</h1>
      <router-link
        to="/favorites"
        class="px-4 py-2 text-white rounded-lg transition-colors"
      >
        My Favorites ♥
      </router-link>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <FilterBar />
    </div>

    <LoadingSpinner v-if="store.loading" />

    <div v-else-if="store.error" class="text-red-500 text-center">
      {{ store.error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        v-for="movie in store.movies"
        :key="movie.id"
        class="bg-white rounded-lg shadow-md overflow-hidden relative group"
      >
        <MovieCard :movie="movie" />
      </div>
    </div>
    <div
      v-if="!store.loading && store.movies.length === 0"
      class="text-center text-gray-500 mt-8"
    >
      No movies found matching your criteria.
    </div>

    <Pagination className="mt-8 flex justify-center items-center gap-4"/>
  </main>
</template>
