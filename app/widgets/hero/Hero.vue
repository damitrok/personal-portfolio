<script setup lang="ts">
import { AppButton, MonoTag } from '@/shared/ui'

const localePath = useLocalePath()
const { t } = useI18n()

// The 3D scene (TresJS/Three.js) replaces this static placeholder in the
// "wow layer" build phase — see PLAN.md section 6, phase 3.
</script>

<template>
  <section class="hero">
    <div class="hero__scene-placeholder" aria-hidden="true" />
    <MonoTag class="hero__eyebrow">{{ t('home.hero.eyebrow') }}</MonoTag>
    <h1 class="hero__name">{{ t('home.hero.name') }}</h1>
    <p class="hero__tagline">{{ t('home.hero.tagline') }}</p>
    <AppButton :to="localePath('/architecture')" variant="solid">
      {{ t('home.hero.cta') }}
    </AppButton>
    <span class="hero__scroll-hint">{{ t('home.hero.scrollHint') }}</span>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $spacing-30;
  min-height: 70vh;
  padding: $spacing-72 0;
  justify-content: center;
}

.hero__scene-placeholder {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: $surface-paper;
  border-radius: $radius-cards;
}

.hero__eyebrow {
  color: $color-press-ink;
}

.hero__name {
  @include display-type;
}

.hero__tagline {
  @include body-type;
  max-width: 720px;
  color: $color-press-ink;
}

.hero__scroll-hint {
  @include mono-caption;
  color: $color-mute-gray;
}
</style>
