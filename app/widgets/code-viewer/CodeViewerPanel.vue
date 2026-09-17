<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { CODE_THEME_NAME, useHighlighter } from '@/shared/lib/highlighter'
import { useCodeViewer } from '@/shared/lib/useCodeViewer'

const { t } = useI18n()
const { isOpen, activeSnippet, close } = useCodeViewer()

const highlightedHtml = ref('')
const isHighlighting = ref(false)

const closeButtonRef = useTemplateRef('closeButtonRef')
const codeRegionRef = useTemplateRef('codeRegionRef')
let lastFocusedElement: HTMLElement | null = null

watch(isOpen, async (open) => {
  if (open) {
    lastFocusedElement = document.activeElement as HTMLElement | null
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    lastFocusedElement?.focus()
  }
})

watch(
  activeSnippet,
  async (snippet) => {
    if (!snippet) return
    isHighlighting.value = true
    const highlighter = await useHighlighter()
    highlightedHtml.value = highlighter.codeToHtml(snippet.source, {
      lang: snippet.lang,
      theme: CODE_THEME_NAME
    })
    isHighlighting.value = false
  },
  { immediate: true }
)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key !== 'Tab') return

  const focusables = [codeRegionRef.value, closeButtonRef.value].filter(
    (el): el is HTMLDivElement | HTMLButtonElement => el !== null
  )
  if (focusables.length === 0) return

  const currentIndex = focusables.indexOf(document.activeElement as HTMLDivElement | HTMLButtonElement)
  const nextIndex = event.shiftKey
    ? (currentIndex - 1 + focusables.length) % focusables.length
    : (currentIndex + 1) % focusables.length

  event.preventDefault()
  focusables[nextIndex]?.focus()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="code-viewer-fade">
      <div v-if="isOpen" class="code-viewer__backdrop" @click="close" />
    </Transition>
    <Transition name="code-viewer-slide">
      <aside
        v-if="isOpen"
        class="code-viewer"
        role="dialog"
        aria-modal="true"
        :aria-label="activeSnippet?.title ?? t('common.viewSource')"
        @keydown="handleKeydown"
      >
        <header class="code-viewer__header">
          <span class="code-viewer__title">{{ activeSnippet?.title }}</span>
          <button
            ref="closeButtonRef"
            type="button"
            class="code-viewer__close"
            :aria-label="t('common.close')"
            @click="close"
          >
            ×
          </button>
        </header>

        <div
          ref="codeRegionRef"
          class="code-viewer__body"
          tabindex="0"
          role="group"
          :aria-label="activeSnippet?.title ?? t('common.viewSource')"
        >
          <p v-if="isHighlighting" class="code-viewer__loading">{{ t('common.loading') }}</p>
          <!-- eslint-disable-next-line vue/no-v-html -- Shiki's own HTML output for this project's own bundled source, not user input -->
          <div v-else class="code-viewer__code" v-html="highlightedHtml" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.code-viewer__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(18, 18, 18, 0.5);
  z-index: 100;
}

.code-viewer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background: $surface-canvas;
  @include hairline-border($side: left);
  z-index: 101;
  display: flex;
  flex-direction: column;
}

.code-viewer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-20;
  padding: $spacing-20;
  @include hairline-border($side: bottom);
}

.code-viewer__title {
  @include mono-caption;
  color: $color-press-ink;
  overflow-wrap: anywhere;
}

.code-viewer__close {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  background: transparent;
  color: $color-press-ink;
  cursor: pointer;
  border-radius: $radius-nav-item;
  @include hairline-border;
  @include focus-ring;

  &:hover {
    background: $color-newsprint;
  }
}

.code-viewer__body {
  flex: 1;
  overflow: auto;
  @include focus-ring;
}

.code-viewer__loading {
  @include mono-caption;
  color: $color-press-ink;
  padding: $spacing-20;
}

.code-viewer__code {
  :deep(pre.shiki) {
    margin: 0;
    padding: $spacing-20;
    font-family: $font-mono;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre;
    overflow-x: auto;
  }
}

.code-viewer-slide-enter-active,
.code-viewer-slide-leave-active {
  transition: transform 0.25s ease;
}

.code-viewer-slide-enter-from,
.code-viewer-slide-leave-to {
  transform: translateX(100%);
}

.code-viewer-fade-enter-active,
.code-viewer-fade-leave-active {
  transition: opacity 0.2s ease;
}

.code-viewer-fade-enter-from,
.code-viewer-fade-leave-to {
  opacity: 0;
}
</style>
