<script setup lang="ts">
import { SortsBy } from '@/enums/movie.enum'
import type { BaseProps } from '@/interfaces/props.interface';
import { useMovieStore } from '@/stores/movie'

interface SortFilterProps extends BaseProps {
    label?: string
}

const { label = 'Sort By', className = '' } = defineProps<SortFilterProps>()

const store = useMovieStore()
</script>
<template>
      <div :class="className">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
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
    </div>

</template>
