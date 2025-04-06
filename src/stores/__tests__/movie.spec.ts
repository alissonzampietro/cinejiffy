import { beforeEach, describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '../movie'
import * as movieService from '@/services/movies.service'
import { SortsBy } from '@/enums/movie.enum'
import type { Movie, MovieResponse } from '@/interfaces/tmdb.interface'
import { FAVORITE_MOVIES_ID_KEY } from '@/constants/favorite.constants'

vi.mock('@/services/movies.service', () => ({
  fetchMovies: vi.fn(),
  fetchGenres: vi.fn(),
  fetchMovieDetails: vi.fn(),
  fetchSimilarMovies: vi.fn(),
  getImageUrl: vi.fn()
}))

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('State', () => {
    it('initializes with default values', () => {
      const store = useMovieStore()
      expect(store.movies).toEqual([])
      expect(store.currentPage).toBe(1)
      expect(store.totalPages).toBe(1)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.filters).toEqual({
        query: '',
        genres: [],
        year: null,
        minRating: 0,
        sortBy: SortsBy.Popularity
      })
    })
  })

  describe('Actions', () => {
    it('loads movies successfully', async () => {
      const mockMovies = {
        results: [{ id: 1, title: 'Test Movie' }],
        page: 1,
        total_pages: 2,
        total_results: 20
      }
      vi.mocked(movieService.fetchMovies).mockResolvedValue(mockMovies as MovieResponse)

      const store = useMovieStore()
      await store.loadMovies()

      expect(store.movies).toEqual(mockMovies.results)
      expect(store.currentPage).toBe(1)
      expect(store.totalPages).toBe(2)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('handles movie loading error', async () => {
      const error = new Error('Failed to load movies.')
      vi.mocked(movieService.fetchMovies).mockRejectedValue(error)

      const store = useMovieStore()
      await store.loadMovies()

      expect(store.error).toBe('Failed to load movies.')
      expect(store.loading).toBe(false)
    })

    it('loads genres successfully', async () => {
      const mockGenres = {
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Comedy' }
        ]
      }
      vi.mocked(movieService.fetchGenres).mockResolvedValue(mockGenres)

      const store = useMovieStore()
      await store.loadGenres()

      expect(store.genres).toEqual(mockGenres.genres)
      expect(store.error).toBeNull()
    })

    it('updates filters and reloads movies', async () => {
      const store = useMovieStore()
      const mockMovies = {
        results: [{ id: 1, title: 'Test Movie' }],
        page: 1,
        total_pages: 1,
        total_results: 1
      }
      vi.mocked(movieService.fetchMovies).mockResolvedValue(mockMovies as MovieResponse)

      await store.updateFilters({
        query: 'test',
        year: 2024
      })

      expect(store.filters.query).toBe('test')
      expect(store.filters.year).toBe(2024)
      expect(movieService.fetchMovies).toHaveBeenCalledWith(
        expect.objectContaining({
          query: 'test',
          year: 2024
        }),
        1
      )
    })

    it('manages favorites in localStorage', () => {
      const store = useMovieStore()
      const movie = {id: 1} as Movie

      // Add to favorites
      store.toggleFavorite(movie)
      expect(store.isFavorite(movie.id)).toBe(true)
      expect(localStorage.getItem(FAVORITE_MOVIES_ID_KEY)).toBe('[1]')

      // Remove from favorites
      store.toggleFavorite(movie)
      expect(store.isFavorite(movie.id)).toBe(false)
      expect(localStorage.getItem(FAVORITE_MOVIES_ID_KEY)).toBe('[]')
    })
  })
})
