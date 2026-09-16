<script setup lang="ts">
import { MonoTag, Panel, SparkleDivider } from '@/shared/ui'
import { CodeSnippetTrigger } from '@/features/code-snippet-trigger'
import type { CodeSnippet } from '@/shared/lib/useCodeViewer'

import mainScssSource from '@/shared/styles/main.scss?raw'
import langSwitchSource from '@/features/lang-switch/LangSwitch.vue?raw'
import codeViewerPanelSource from '@/widgets/code-viewer/CodeViewerPanel.vue?raw'
import useReducedMotionSource from '@/shared/lib/useReducedMotion.ts?raw'

const { t } = useI18n()

// Content lives entirely in i18n (architecture.sections.*). Section bodies
// are placeholder copy until the corresponding build phase lands — see
// PLAN.md — and are rendered as-is, not paraphrased or hidden. Each
// section's "view source" trigger points at the real file backing its
// claim, pulled in at build time via `?raw` — never a hand-copied snippet.
// "Rendering strategy" has none: that claim lives in nuxt.config.ts, which
// Nuxt itself refuses to import client-side (a deliberate secrets guard) —
// no substitute file here would honestly back the claim.
const sections = computed<
  Array<{ number: string; title: string; body: string; snippet?: CodeSnippet }>
>(() => [
  {
    number: '01',
    title: t('architecture.sections.rendering.title'),
    body: t('architecture.sections.rendering.body')
  },
  {
    number: '02',
    title: t('architecture.sections.animation.title'),
    body: t('architecture.sections.animation.body'),
    snippet: { title: 'app/shared/styles/main.scss', source: mainScssSource, lang: 'scss' }
  },
  {
    number: '03',
    title: t('architecture.sections.i18n.title'),
    body: t('architecture.sections.i18n.body'),
    snippet: { title: 'app/features/lang-switch/LangSwitch.vue', source: langSwitchSource, lang: 'vue' }
  },
  {
    number: '04',
    title: t('architecture.sections.codeViewer.title'),
    body: t('architecture.sections.codeViewer.body'),
    snippet: { title: 'app/widgets/code-viewer/CodeViewerPanel.vue', source: codeViewerPanelSource, lang: 'vue' }
  },
  {
    number: '05',
    title: t('architecture.sections.performance.title'),
    body: t('architecture.sections.performance.body'),
    snippet: { title: 'app/shared/lib/useReducedMotion.ts', source: useReducedMotionSource, lang: 'typescript' }
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
          <CodeSnippetTrigger
            v-if="section.snippet"
            :title="section.snippet.title"
            :source="section.snippet.source"
            :lang="section.snippet.lang"
          />
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
