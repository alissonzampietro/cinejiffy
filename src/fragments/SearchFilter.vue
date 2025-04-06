<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import { useMovieStore } from '@/stores/movie'
import type { BaseProps } from '@/interfaces/props.interface'

interface SearchFilterProps extends BaseProps {
    label?: string
}

const store = useMovieStore()
const searchQuery = ref<string>('')

const { label = 'Search' } = defineProps<SearchFilterProps>()

const debouncedSearch = debounce((query) => {
  store.updateFilters({ query })
}, 300)

watch(searchQuery, (query) => {
  debouncedSearch(query)
})

</script>

<template>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <input
          v-model="searchQuery"
          type="text"
          data-cy="search-input"
          placeholder="Search movies..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
    </div>
</template>
