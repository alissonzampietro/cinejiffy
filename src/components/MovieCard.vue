<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { getImageUrl } from '@/services/movies.service'
import type { Movie } from '@/interfaces/tmdb.interface';
import type { BaseProps } from '@/interfaces/props.interface';

const store = useMovieStore()

interface MovieCardProps extends BaseProps {
    movie: Movie,
}

const { movie, className = '' } = defineProps<MovieCardProps>()

</script>

<template>
    <div :class="className" data-cy="movie-card">
        <router-link :to="{ name: 'movie-details', params: { id: movie.id }}" class="block">
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-200"
            >
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2 truncate">{{ movie.title }}</h2>
                <p class="text-gray-600 text-sm mb-2">{{ new Date(movie.release_date).getFullYear() }}</p>
                <div class="flex items-center">
                    <span class="text-yellow-500 mr-1">★</span>
                    <span>{{ movie.vote_average.toFixed(1) }}</span>
                </div>
            </div>
        </router-link>
        <button
            @click="store.toggleFavorite(movie.id)"
            data-cy="favorite-button"
            class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
            <span
            :class="[
                'text-xl',
                store.isFavorite(movie.id) ? 'text-red-500' : 'text-gray-400'
            ]"
            >♥</span>
        </button>
    </div>
</template>
