import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.find('div.h-12').exists()).toBe(true)
  })

  it('renders with small size', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'sm'
      }
    })
    expect(wrapper.find('div.h-8').exists()).toBe(true)
  })

  it('renders with large size', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.find('div.h-16').exists()).toBe(true)
  })

  it('renders in fullscreen mode', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        fullScreen: true
      }
    })
    expect(wrapper.find('div.fixed.inset-0').exists()).toBe(true)
  })
})
