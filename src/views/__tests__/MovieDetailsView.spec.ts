import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MovieDetailsView from '../MovieDetailsView.vue'
import { useMovieStore } from '@/stores/movie'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      id: '1'
    }
  })
}))

describe('MovieDetailsView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createWrapper = (initialState = {}) => {
    return mount(MovieDetailsView, {
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
          LoadingSpinner,
          MovieCard
        }
      }
    })
  }

  it('shows loading spinner when loading', () => {
    const wrapper = createWrapper({
      movies: {
        loading: true,
        error: null
      }
    })
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  })

  it('shows error message when there is an error', () => {
    const wrapper = createWrapper({
      movies: {
        loading: false,
        error: 'Test error message'
      }
    })
    expect(wrapper.find('[data-cy="error-message"]').text()).toBe('Test error message')
  })

  it('renders movie details when loaded', () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      backdrop_path: '/test.jpg',
      poster_path: '/test.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      vote_count: 100,
      status: 'Released',
      runtime: 120,
      genres: [{ id: 1, name: 'Action' }],
      tagline: 'Test Tagline'
    }

    const wrapper = createWrapper({
      movies: {
        selectedMovie: movie,
        loading: false,
        error: null
      }
    })

    expect(wrapper.find('[data-cy="movie-title"]').text()).toBe('Test Movie')
    expect(wrapper.find('[data-cy="movie-overview"]').text()).toBe('Test Overview')
  })

  it('loads movie details on mount', () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    expect(store.loadMovieDetails).toHaveBeenCalledWith(1)
  })

  it('toggles favorite status', async () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      backdrop_path: '/test.jpg',
      poster_path: '/test.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      vote_count: 100,
      status: 'Released',
      runtime: 120,
      genres: [{ id: 1, name: 'Action' }],
      tagline: 'Test Tagline'
    }

    const wrapper = createWrapper({
      movies: {
        selectedMovie: movie,
        loading: false,
        error: null
      }
    })

    await wrapper.vm.$nextTick()

    const favoriteButton = wrapper.find('button')
    expect(favoriteButton.exists()).toBe(true)
    
    await favoriteButton.trigger('click')

    const store = useMovieStore()
    expect(store.toggleFavorite).toHaveBeenCalledWith(1)
  })
})
