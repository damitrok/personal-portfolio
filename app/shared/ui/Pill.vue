<script setup lang="ts">
withDefaults(defineProps<{ as?: string; active?: boolean }>(), { as: 'div', active: false })
</script>

<template>
  <component :is="as" class="pill" :class="{ 'pill--active': active }">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.pill {
  display: inline-flex;
  align-items: center;
  font-family: $font-sans;
  font-weight: $weight-medium;
  font-size: $text-subheading * 0.75;
  color: $color-press-ink;
  border-radius: $radius-nav-item;
  padding: $spacing-10 $spacing-20;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: background-color 0.15s ease;

  @include focus-ring;

  &:hover {
    background: $color-newsprint;
  }
}

.pill--active {
  background: $color-newsprint;
}
</style>
