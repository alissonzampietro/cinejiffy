import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import FavoritesView from '../FavoritesView.vue'
import { useMovieStore } from '@/stores/movie'
import { getImageUrl } from '@/services/movies.service'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'

vi.mock('@/services/movies.service', () => ({
  getImageUrl: vi.fn()
}))

describe('FavoritesView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createWrapper = (initialState = {}) => {
    return mount(FavoritesView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState
          })
        ],
        stubs: {
          'router-link': true
        },
        components: {
          MovieCard,
          LoadingSpinner
        }
      }
    })
  }

  it('shows loading spinner when loading', () => {
    const wrapper = createWrapper({
      movies: {
        loading: true
      }
    })
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  })

  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to load favorites'
    const wrapper = createWrapper({
      movies: {
        error: errorMessage,
        loading: false
      }
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  it('renders favorite movies when available', async () => {
    const movies = [
      {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        release_date: '2024-01-01',
        vote_average: 8.5
      }
    ]

    const wrapper = createWrapper({
      movies: {
        movies,
        loading: false,
        error: null
      }
    })

    // Get store and set up favorites
    const store = useMovieStore()
    store.isFavorite = vi.fn().mockReturnValue(true)
    store.movies = movies
    await wrapper.vm.$nextTick()

    const movieCard = wrapper.findComponent(MovieCard)
    expect(movieCard.exists()).toBe(true)
    expect(movieCard.props('movie')).toEqual(movies[0])
    expect(wrapper.find('[data-cy="no-favorites-message"]').exists()).toBe(false)
  })

  it('shows empty state when no favorites', () => {
    const wrapper = createWrapper({
      movies: {
        movies: [],
        loading: false,
        error: null
      }
    })

    const store = useMovieStore()
    store.isFavorite = vi.fn().mockReturnValue(false)

    expect(wrapper.find('[data-cy="no-favorites-message"]').exists()).toBe(true)
  })

  it('loads initial data on mount', () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    expect(store.loadGenres).toHaveBeenCalled()
  })

  it('removes movie from favorites', async () => {
    const movies = [
      {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        release_date: '2024-01-01',
        vote_average: 8.5
      }
    ]

    const wrapper = createWrapper({
      movies: {
        movies,
        loading: false,
        error: null
      }
    })

    // Get store and set up favorites
    const store = useMovieStore()
    store.isFavorite = vi.fn().mockReturnValue(true)
    store.movies = movies
    await wrapper.vm.$nextTick()

    const movieCard = wrapper.findComponent(MovieCard)
    expect(movieCard.exists()).toBe(true)

    const favoriteButton = movieCard.find('[data-cy="favorite-button"]')
    await favoriteButton.trigger('click')

    expect(store.toggleFavorite).toHaveBeenCalledWith(1)
  })
})
