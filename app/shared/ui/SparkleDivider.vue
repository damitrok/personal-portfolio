<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 5 })
</script>

<template>
  <div class="sparkle-divider" role="separator" aria-hidden="true">
    <svg
      v-for="n in count"
      :key="n"
      class="sparkle-divider__icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;

.sparkle-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-72;
  color: $color-press-ink;
  padding: $spacing-40 0;
  flex-wrap: wrap;
}

.sparkle-divider__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
