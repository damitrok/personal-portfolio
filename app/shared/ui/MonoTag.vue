<script setup lang="ts">
withDefaults(defineProps<{ bracketed?: boolean }>(), { bracketed: true })
</script>

<template>
  <span class="mono-tag">{{ bracketed ? '[' : '' }}<slot />{{ bracketed ? ']' : '' }}</span>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.mono-tag {
  @include mono-caption;
  color: $color-press-ink;
}
</style>
