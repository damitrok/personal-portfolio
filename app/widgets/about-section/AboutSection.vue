<script setup lang="ts">
import { MonoTag, Panel, SparkleDivider } from '@/shared/ui'

const { t } = useI18n()
</script>

<template>
  <section class="about-section">
    <MonoTag class="about-section__eyebrow">{{ t('about.eyebrow') }}</MonoTag>
    <h1 class="about-section__title">{{ t('about.title') }}</h1>
    <p class="about-section__intro">{{ t('about.intro') }}</p>

    <Panel class="about-section__facts">
      <div class="about-section__fact">
        <span class="about-section__fact-label">{{ t('about.experience.label') }}</span>
        <span class="about-section__fact-value">{{ t('about.experience.value') }}</span>
      </div>
      <div class="about-section__fact">
        <span class="about-section__fact-label">{{ t('about.focusLabel') }}</span>
        <span class="about-section__fact-value">{{ t('about.focusValue') }}</span>
      </div>
    </Panel>

    <SparkleDivider />

    <p class="about-section__summary">{{ t('about.summary') }}</p>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.about-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-30;
  padding: $spacing-72 0;
}

.about-section__eyebrow {
  color: $color-press-ink;
}

.about-section__title {
  @include heading-type;
}

.about-section__intro,
.about-section__summary {
  @include body-type;
  max-width: 720px;
  color: $color-press-ink;
}

.about-section__facts {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-30;

  @include respond-up(md) {
    grid-template-columns: 1fr 1fr;
  }
}

.about-section__fact {
  display: flex;
  flex-direction: column;
  gap: $spacing-10;
}

.about-section__fact-label {
  @include mono-caption;
  color: $color-mute-gray;
}

.about-section__fact-value {
  @include body-type;
  color: $color-press-ink;
}
</style>
