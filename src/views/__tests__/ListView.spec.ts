import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ListView from '../ListView.vue'
import { useMovieStore } from '@/stores/movie'
import { getImageUrl } from '@/services/movies.service'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Multiselect from 'vue-multiselect'

vi.mock('@/services/movies.service', () => ({
  getImageUrl: vi.fn()
}))

describe('ListView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createWrapper = (initialState = {}) => {
    return mount(ListView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState
          })
        ]
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
    const errorMessage = 'Failed to load movies'
    const wrapper = createWrapper({
      movies: {
        error: errorMessage,
        loading: false
      }
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  it('renders movie grid when movies are loaded', () => {
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

    expect(wrapper.find('.grid').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Movie')
    expect(wrapper.text()).toContain('2024')
    expect(wrapper.text()).toContain('8.5')
  })

  it('shows empty state when no movies are found', () => {
    const wrapper = createWrapper({
      movies: {
        movies: [],
        loading: false,
        error: null
      }
    })
    expect(wrapper.text()).toContain('No movies found matching your criteria')
  })

  it('updates search query with debounce', async () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    const input = wrapper.find('input[type="text"]')

    await input.setValue('test')
    expect(store.updateFilters).not.toHaveBeenCalled()

    
    await new Promise(resolve => setTimeout(resolve, 300))
    expect(store.updateFilters).toHaveBeenCalledWith({ query: 'test' })
  })

  it('updates filters when year is selected', async () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    const select = wrapper.findComponent(Multiselect)

    await select.vm.$emit('update:modelValue', 2024)
    await wrapper.vm.$nextTick()

    expect(store.updateFilters).toHaveBeenCalledWith(
      expect.objectContaining({ year: 2024 })
    )
  })

  it('loads initial data on mount', () => {
    const wrapper = createWrapper()
    const store = useMovieStore()
    expect(store.loadGenres).toHaveBeenCalled()
    expect(store.loadMovies).toHaveBeenCalled()
  })
})
