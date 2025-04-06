<script setup lang="ts">
import GenreFilter from '@/fragments/GenreFilter.vue'
import ReleaseYearFilter from '@/fragments/ReleaseYearFilter.vue'
import SearchFilter from '@/fragments/SearchFilter.vue'
import RatingFilter from '@/fragments/RatingFilter.vue'
import SortFilter from '@/fragments/SortFilter.vue'
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-cy="filter-bar">
      <SearchFilter />
      <ReleaseYearFilter />
      <GenreFilter />
      <RatingFilter />
    </div>
    <div class="mt-6" data-cy="sort-filter">
      <SortFilter />
    </div>
</template>