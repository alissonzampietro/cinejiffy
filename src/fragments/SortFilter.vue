<script setup>
import { SortsBy } from '@/enums/movie.enum'
import { useMovieStore } from '@/stores/movie'

const store = useMovieStore()
</script>
<template>
      <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
      <div class="flex gap-4">
        <button
          v-for="option in [
            { value: SortsBy.Popularity, label: 'Popularity' },
            { value: SortsBy.Rating, label: 'Rating' },
            { value: SortsBy.ReleaseDate, label: 'Release Date' }
          ]"
          :key="option.value"
          @click="store.updateFilters({ sortBy: option.value })"
          :class="[
            'px-4 py-2 rounded-lg transition-colors hover:cursor-pointer',
            store.filters.sortBy === option.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          ]">
          {{ option.label }}
        </button>
      </div>

</template>
