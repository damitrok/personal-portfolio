<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    variant?: 'solid' | 'outline'
    to?: string
  }>(),
  { as: 'button', variant: 'outline', to: undefined }
)
</script>

<template>
  <component :is="to ? 'NuxtLink' : as" :to="to" class="app-button" :class="`app-button--${variant}`">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.app-button {
  display: inline-flex;
  align-items: center;
  gap: $spacing-10;
  font-family: $font-sans;
  font-weight: $weight-medium;
  font-size: $text-subheading * 0.75;
  text-decoration: none;
  cursor: pointer;
  border-radius: $radius-nav-item;
  padding: $spacing-10 * 1.2 $spacing-20;
  @include hairline-border;
  @include focus-ring;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.app-button--outline {
  background: transparent;
  color: $color-press-ink;

  &:hover {
    background: $color-press-ink;
    color: $color-paper-white;
  }
}

.app-button--solid {
  background: $color-press-ink;
  color: $color-paper-white;

  &:hover {
    background: $color-newsprint;
    color: $color-press-ink;
  }
}
</style>
