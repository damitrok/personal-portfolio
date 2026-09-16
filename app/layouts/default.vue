<script setup lang="ts">
import { NavPill } from '@/widgets/nav-pill'
import { FooterStrip } from '@/widgets/footer-strip'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">{{ $t('common.skipToContent') }}</a>
    <NavPill />
    <main id="main-content" class="app-shell__main">
      <slot />
    </main>
    <FooterStrip />
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1;
  width: 100%;
  max-width: $page-max-width;
  margin: 0 auto;
  padding: 0 $spacing-20;

  @media (min-width: $bp-lg) {
    padding: 0 $spacing-40;
  }
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: $color-press-ink;
  color: $color-paper-white;
  padding: $spacing-10 $spacing-20;
  z-index: 100;

  &:focus {
    left: $spacing-20;
    top: $spacing-20;
  }
}
</style>
