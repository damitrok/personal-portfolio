<script setup lang="ts">
import { MonoTag, Panel, SparkleDivider } from '@/shared/ui'

const { t } = useI18n()

// Content lives entirely in i18n (architecture.sections.*). Section bodies
// are placeholder copy until the corresponding build phase lands — see
// PLAN.md — and are rendered as-is, not paraphrased or hidden.
const sections = computed(() => [
  {
    number: '01',
    title: t('architecture.sections.rendering.title'),
    body: t('architecture.sections.rendering.body')
  },
  {
    number: '02',
    title: t('architecture.sections.animation.title'),
    body: t('architecture.sections.animation.body')
  },
  {
    number: '03',
    title: t('architecture.sections.i18n.title'),
    body: t('architecture.sections.i18n.body')
  },
  {
    number: '04',
    title: t('architecture.sections.codeViewer.title'),
    body: t('architecture.sections.codeViewer.body')
  },
  {
    number: '05',
    title: t('architecture.sections.performance.title'),
    body: t('architecture.sections.performance.body')
  }
])
</script>

<template>
  <section class="architecture-case-study">
    <MonoTag class="architecture-case-study__eyebrow">{{ t('architecture.eyebrow') }}</MonoTag>
    <h1 class="architecture-case-study__title">{{ t('architecture.title') }}</h1>
    <p class="architecture-case-study__intro">{{ t('architecture.intro') }}</p>

    <SparkleDivider />

    <ol class="architecture-case-study__list">
      <li v-for="section in sections" :key="section.number" class="architecture-case-study__item">
        <Panel class="architecture-case-study__panel">
          <MonoTag class="architecture-case-study__number">{{ section.number }}</MonoTag>
          <h2 class="architecture-case-study__section-title">{{ section.title }}</h2>
          <p class="architecture-case-study__section-body">{{ section.body }}</p>
        </Panel>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.architecture-case-study {
  display: flex;
  flex-direction: column;
  gap: $spacing-30;
  padding: $spacing-72 0;
}

.architecture-case-study__eyebrow {
  color: $color-press-ink;
}

.architecture-case-study__title {
  @include heading-type;
}

.architecture-case-study__intro {
  @include body-type;
  max-width: 720px;
  color: $color-press-ink;
}

.architecture-case-study__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-30;
  list-style: none;
  margin: 0;
  padding: 0;
}

.architecture-case-study__item {
  display: block;
}

.architecture-case-study__panel {
  display: flex;
  flex-direction: column;
  gap: $spacing-20;
}

.architecture-case-study__number {
  color: $color-mute-gray;
}

.architecture-case-study__section-title {
  @include heading-type;
  font-size: clamp(24px, 3vw, #{$text-heading-sm});
  text-transform: none;
}

.architecture-case-study__section-body {
  @include body-type;
  color: $color-press-ink;

  @include respond-up(md) {
    max-width: 640px;
  }
}
</style>
