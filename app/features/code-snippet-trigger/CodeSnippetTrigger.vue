<script setup lang="ts">
import type { CodeSnippet } from '@/shared/lib/useCodeViewer'
import { useCodeViewer } from '@/shared/lib/useCodeViewer'

const props = defineProps<{
  title: string
  source: string
  lang?: CodeSnippet['lang']
}>()

const { t } = useI18n()
const { open } = useCodeViewer()

function handleClick() {
  open({ title: props.title, source: props.source, lang: props.lang ?? 'vue' })
}
</script>

<template>
  <button type="button" class="code-snippet-trigger" :aria-label="`${t('common.viewSource')}: ${title}`" @click="handleClick">
    <span aria-hidden="true">&lt;/&gt;</span>
    <span class="code-snippet-trigger__label">{{ t('common.viewSource') }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.code-snippet-trigger {
  display: inline-flex;
  align-items: center;
  gap: $spacing-10;
  background: transparent;
  border: none;
  padding: $spacing-10 * 0.4 $spacing-10;
  margin: 0 (-$spacing-10);
  border-radius: $radius-nav-item;
  cursor: pointer;
  color: $color-press-ink;
  @include mono-caption;
  @include focus-ring;

  &:hover {
    // A lighter foreground on hover would fail WCAG contrast against the
    // white/newsprint backgrounds this sits on — de-emphasize with a fill
    // instead, the same pattern Pill and AppButton use.
    background: $color-newsprint;
  }
}

.code-snippet-trigger__label {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
