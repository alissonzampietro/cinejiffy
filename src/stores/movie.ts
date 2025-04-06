import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchGenres, fetchMovieDetails, fetchMovies, fetchSimilarMovies } from '@/services/movies.service'
import type { Genre, Movie, MovieDetails, MovieFilters } from '@/interfaces/tmdb.interface'
import { SortsBy } from '@/enums/movie.enum'

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50]
const FAVORITE_MOVIES_KEY = 'favorite_movies'

export const useMovieStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalResults = ref(0)
  const itemsPerPage = ref(ITEMS_PER_PAGE_OPTIONS[0])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const genres = ref<Genre[]>([])
  const selectedMovie = ref<MovieDetails | null>(null)
  const similarMovies = ref<Movie[]>([])
  const favoriteMovies = ref<Set<number>>(new Set(JSON.parse(localStorage.getItem(FAVORITE_MOVIES_KEY) || '[]')))

  const filters = ref<MovieFilters>({
    query: '',
    genres: [],
    year: null,
    minRating: 0,
    sortBy: SortsBy.Popularity
  })

  const hasMovies = computed(() => movies.value.length > 0)
  const hasFilters = computed(() => {
    return filters.value.query !== '' ||
      filters.value.genres.length > 0 ||
      filters.value.year !== null ||
      filters.value.minRating > 0
  })

  async function loadGenres() {
    try {
      const response = await fetchGenres()
      genres.value = response.genres
    } catch (err) {
      console.error('Failed to fetch genres:', err)
      error.value = (err as Error)?.message || 'Failed to load genres.'
    }
  }

  async function loadMovies(page = 1) {
    try {
      loading.value = true
      const response = await fetchMovies(filters.value, page)
      movies.value = response.results
      currentPage.value = response.page
      totalPages.value = response.total_pages
      totalResults.value = response.total_results
    } catch (err) {
      console.error('Failed to fetch movies:', err)
      error.value = (err as Error)?.message || 'Failed to load movies.'
    } finally {
      loading.value = false
    }
  }

  async function loadMovieDetails(movieId: number) {
    try {
      loading.value = true
      const [details, similar] = await Promise.all([
        fetchMovieDetails(movieId),
        fetchSimilarMovies(movieId)
      ])
      selectedMovie.value = details
      similarMovies.value = similar.results
    } catch (err) {
      console.error('Failed to fetch movie details:', err)
      error.value = (err as Error)?.message || 'Failed to load movie details.'
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: Partial<MovieFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    loadMovies()
  }

  function goToPage(newPage: number) {
    if (newPage > 0 && newPage <= totalPages.value && newPage !== currentPage.value) {
      currentPage.value = newPage
      loadMovies(newPage)
    }
  }

  function updateItemsPerPage(value: number) {
    if (ITEMS_PER_PAGE_OPTIONS.includes(value)) {
      itemsPerPage.value = value
      currentPage.value = 1
      loadMovies()
    }
  }

  function toggleFavorite(movieId: number) {
    const favorites = new Set(favoriteMovies.value)
    if (favorites.has(movieId)) {
      favorites.delete(movieId)
    } else {
      favorites.add(movieId)
    }
    // Create a new Set to trigger reactivity
    favoriteMovies.value = favorites
    localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(Array.from(favorites)))
  }

  function isFavorite(movieId: number): boolean {
    return favoriteMovies.value.has(movieId)
  }

  return {
    movies,
    currentPage,
    totalPages,
    totalResults,
    itemsPerPage,
    loading,
    error,
    genres,
    selectedMovie,
    similarMovies,
    filters,
    hasMovies,
    hasFilters,
    loadGenres,
    loadMovies,
    loadMovieDetails,
    updateFilters,
    goToPage,
    updateItemsPerPage,
    toggleFavorite,
    isFavorite,
    ITEMS_PER_PAGE_OPTIONS
  }
})