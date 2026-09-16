<script setup lang="ts">
import { Pill } from '@/shared/ui'
import LangSwitch from '@/features/lang-switch/LangSwitch.vue'

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/stack', key: 'nav.stack' },
  { to: '/architecture', key: 'nav.architecture' },
  { to: '/contact', key: 'nav.contact' }
] as const

function isActive(to: string) {
  return to === '/' ? route.path === localePath('/') : route.path.startsWith(localePath(to))
}
</script>

<template>
  <nav class="nav-pill" aria-label="Primary">
    <Pill
      v-for="link in links"
      :key="link.to"
      as="NuxtLink"
      :to="localePath(link.to)"
      :active="isActive(link.to)"
    >
      {{ t(link.key) }}
    </Pill>
    <LangSwitch />
  </nav>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.nav-pill {
  position: sticky;
  top: $spacing-20;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: calc(#{$spacing-10} / 2);
  width: fit-content;
  max-width: calc(100vw - #{$spacing-40});
  margin: $spacing-20 auto;
  padding: $spacing-10 $spacing-20;
  background: $surface-elevated-pill;
  border-radius: $radius-nav-pill;
  @include hairline-border;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black #{$spacing-20},
    black calc(100% - #{$spacing-20}),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black #{$spacing-20},
    black calc(100% - #{$spacing-20}),
    transparent 100%
  );

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
