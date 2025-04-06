<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movie'
import type { BaseProps } from '@/interfaces/props.interface'

interface RatingFilterProps extends BaseProps {
    label?: string
}

const store = useMovieStore()
const minRating = ref(0)

const { label = 'Minimum Rating', className = '' } = defineProps<RatingFilterProps>()

watch(minRating, (rating) => {
    store.updateFilters({ minRating: rating })
})
</script>

<template>
    <div :class="className">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <input
            v-model="minRating"
            type="range"
            min="0"
            max="10"
            step="0.5"
            class="w-full"
        >
        <div class="text-center mt-2">{{ minRating }}</div>
    </div>
</template>
            