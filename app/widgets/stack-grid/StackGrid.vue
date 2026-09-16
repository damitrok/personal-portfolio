<script setup lang="ts">
import { MonoTag, Panel, Pill } from '@/shared/ui'
import { STACK_CATEGORY_ORDER, groupByCategory, stackItems } from '@/entities/stack-item'

const { t } = useI18n()

const groups = groupByCategory(stackItems)
</script>

<template>
  <section class="stack-grid">
    <MonoTag class="stack-grid__eyebrow">{{ t('stack.eyebrow') }}</MonoTag>
    <h1 class="stack-grid__title">{{ t('stack.title') }}</h1>
    <p class="stack-grid__subtitle">{{ t('stack.subtitle') }}</p>

    <div class="stack-grid__categories">
      <Panel
        v-for="category in STACK_CATEGORY_ORDER"
        :key="category"
        class="stack-grid__category"
      >
        <h2 class="stack-grid__category-label">{{ t(`stack.categories.${category}`) }}</h2>
        <ul class="stack-grid__items">
          <li v-for="item in groups[category]" :key="item.name" class="stack-grid__item">
            <span class="stack-grid__item-name">{{ item.name }}</span>
            <Pill as="span" class="stack-grid__item-level">{{ t(`stack.levels.${item.level}`) }}</Pill>
          </li>
        </ul>
      </Panel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.stack-grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-30;
  padding: $spacing-72 0;
}

.stack-grid__eyebrow {
  color: $color-press-ink;
}

.stack-grid__title {
  @include heading-type;
}

.stack-grid__subtitle {
  @include body-type;
  max-width: 720px;
  color: $color-press-ink;
}

.stack-grid__categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-30;
  margin-top: $spacing-20;

  @include respond-up(md) {
    grid-template-columns: 1fr 1fr;
  }
}

.stack-grid__category-label {
  @include mono-caption;
  color: $color-mute-gray;
  margin: 0 0 $spacing-20;
}

.stack-grid__items {
  display: flex;
  flex-direction: column;
  gap: $spacing-10;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack-grid__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-10;
  padding: $spacing-10 0;
  @include hairline-border($side: bottom);

  &:last-child {
    border-bottom: none;
  }
}

.stack-grid__item-name {
  @include body-type;
  color: $color-press-ink;
}

.stack-grid__item-level {
  @include mono-caption;
  padding: $spacing-10 * 0.5 $spacing-20 * 0.5;
  background: $color-newsprint;
  border-radius: $radius-tags;
  cursor: default;

  &:hover {
    background: $color-newsprint;
  }
}
</style>
