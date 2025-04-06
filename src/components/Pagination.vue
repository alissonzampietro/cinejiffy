<script setup lang="ts">
import type { BaseProps } from '@/interfaces/props.interface'

const { className = '' } = defineProps<BaseProps>()

import { useMovieStore } from '@/stores/movie'

const store = useMovieStore()

</script>

<template>

<div v-if="store.totalPages > 1" :class="className" data-cy="pagination">
    <button
        @click="store.goToPage(store.currentPage - 1)"
        :disabled="store.currentPage === 1"
        data-cy="previous-page"
        class="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
    Previous
    </button>
    <span>Page {{ store.currentPage }} of {{ store.totalPages }}</span>
    <button
        @click="store.goToPage(store.currentPage + 1)"
        :disabled="store.currentPage === store.totalPages"
        data-cy="next-page"
        class="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
    Next
    </button>

    <select
        v-model="store.itemsPerPage"
    class="ml-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
    <option v-for="n in store.ITEMS_PER_PAGE_OPTIONS" :key="n" :value="n">
        {{ n }} per page
    </option>
    </select>
</div>

</template>