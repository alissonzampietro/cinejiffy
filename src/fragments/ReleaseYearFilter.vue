<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import Multiselect from 'vue-multiselect'
import type { BaseProps } from '@/interfaces/props.interface'

interface ReleaseYearFilterProps extends BaseProps {
    label?: string
}

const { label = 'Release Year', className = '' } = defineProps<ReleaseYearFilterProps>()

const store = useMovieStore()
const selectedYear = ref(null)

const currentYear = new Date().getFullYear()
const years = ['All years', ...Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)]
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<template>
    <div :class="className" data-cy="year-filter">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <Multiselect
            id="release-year"
            v-model="selectedYear"
            :options="years"
            @update:modelValue="store.updateFilters({ year: selectedYear })"
        />
    </div>
</template>

