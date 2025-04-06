<script setup lang="ts">

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const { size, fullScreen } = defineProps<LoadingSpinnerProps>()
</script>

<template>
  <div
    :class="[
      'flex justify-center items-center',
      fullScreen ? 'fixed inset-0 bg-white/80 z-50' : 'h-64'
    ]"
  >
    <div
      :class="[
        'animate-spin rounded-full border-t-2 border-b-2 border-blue-500',
        {
          'h-8 w-8': size === 'sm',
          'h-12 w-12': size === 'md' || !size,
          'h-16 w-16': size === 'lg'
        }
      ]"
    ></div>
  </div>
</template>
