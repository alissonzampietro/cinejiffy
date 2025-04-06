<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import Multiselect from 'vue-multiselect'
import type { BaseProps } from '@/interfaces/props.interface'
import type { Genre } from '@/interfaces/tmdb.interface'

interface GenreFilterProps extends BaseProps {
    label?: string
}

const { label = 'Genres', className = '' } = defineProps<GenreFilterProps>()

const store = useMovieStore()
const selectedGenres = ref<Genre[]>([])

function updateSelectedGenres(genres: Genre[]) {
    store.updateFilters({ genres: genres.map(g => g.id) })
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<template>
    <div :class="className" data-cy="genre-filter">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <Multiselect 
            v-model="selectedGenres" 
            @update:modelValue="updateSelectedGenres"
            label="name"  
            :options="store.genres" 
            :multiple="true"
            track-by="id"
            :close-on-select="true" 
            :searchable="true"
        />
    </div>
</template>