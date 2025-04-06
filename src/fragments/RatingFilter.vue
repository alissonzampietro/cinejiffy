<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movie'
import type { BaseProps } from '@/interfaces/props.interface'
import Multiselect from 'vue-multiselect'

interface RatingFilterProps extends BaseProps {
    label?: string
}
const ALL_RATINGS_MESSAGE = 'All ratings'
const store = useMovieStore()
const minRating = ref<number | typeof ALL_RATINGS_MESSAGE>(ALL_RATINGS_MESSAGE)

const { label = 'Minimum Rating', className = '' } = defineProps<RatingFilterProps>()

watch(minRating, (rating) => {
    store.updateFilters({ minRating: rating === ALL_RATINGS_MESSAGE ? undefined : rating })
})
</script>

<template>
    <div :class="className">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <Multiselect 
            v-model="minRating"
            :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ALL_RATINGS_MESSAGE].reverse()" 
            @update:modelValue="store.updateFilters({ minRating: minRating === ALL_RATINGS_MESSAGE ? undefined : minRating })" 
        />
    </div>
</template>
            