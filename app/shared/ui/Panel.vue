<script setup lang="ts">
withDefaults(defineProps<{ padded?: boolean }>(), { padded: true })
</script>

<template>
  <div class="panel" :class="{ 'panel--padded': padded }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.panel {
  background: $surface-elevated-pill;
  border-radius: $radius-cards;
  @include hairline-border;
}

.panel--padded {
  padding: $card-padding;
}
</style>
