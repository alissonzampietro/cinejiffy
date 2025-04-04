// src/stores/movies.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchMovies as serviceFetchMovies } from '@/services/movies.service'
import type { PopularMovies } from '@/interfaces/tmdb.interface'

export const useMovieStore = defineStore('movies', () => {
  const movies = ref<PopularMovies>({} as PopularMovies)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalResults = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hasMovies = computed(() => movies.value.results.length > 0)

  async function fetchMovies(page = 1) {
    try {
      loading.value = true
      const response = await serviceFetchMovies(page)
      movies.value = response
      currentPage.value = response.page
      totalPages.value = response.total_pages
      totalResults.value = response.total_results
    } catch (err) {
      console.error('Failed to fetch movies:', err)
      error.value = (err as Error)?.message || 'An unknown error occurred.'
    } finally {
      loading.value = false
    }
  }

  function goToPage(newPage: number) {
    if (newPage > 0 && newPage <= totalPages.value && newPage !== currentPage.value) {
        fetchMovies(newPage)
    }
  }

  // --- Return ---
  return {
    movies,
    currentPage,
    totalPages,
    totalResults,
    loading,
    error,
    hasMovies,
    fetchMovies,
    goToPage
  }
})