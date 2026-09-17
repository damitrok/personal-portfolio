<script setup lang="ts">
import { AppButton, MonoTag, Panel } from '@/shared/ui'

const { t } = useI18n()

const stripLeadingAt = (value: string) => value.replace(/^@/, '')

const emailValue = computed(() => t('contact.email.value'))
const emailHref = computed(() => `mailto:${emailValue.value}`)

const telegramValue = computed(() => t('contact.telegram.value'))
const telegramHref = computed(() => `https://t.me/${stripLeadingAt(telegramValue.value)}`)
</script>

<template>
  <section class="contact-links">
    <MonoTag class="contact-links__eyebrow">{{ t('contact.eyebrow') }}</MonoTag>
    <h1 class="contact-links__title">{{ t('contact.title') }}</h1>
    <p class="contact-links__intro">{{ t('contact.intro') }}</p>

    <Panel class="contact-links__panel">
      <div class="contact-links__item">
        <span class="contact-links__label">{{ t('contact.email.label') }}</span>
        <AppButton as="a" v-bind="{ href: emailHref }">
          {{ emailValue }}
        </AppButton>
      </div>

      <div class="contact-links__item">
        <span class="contact-links__label">{{ t('contact.telegram.label') }}</span>
        <AppButton as="a" v-bind="{ href: telegramHref, target: '_blank', rel: 'noopener' }">
          {{ telegramValue }}
        </AppButton>
      </div>
    </Panel>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.contact-links {
  display: flex;
  flex-direction: column;
  gap: $spacing-30;
  padding: $spacing-72 0;
}

.contact-links__eyebrow {
  color: $color-press-ink;
}

.contact-links__title {
  @include heading-type;
}

.contact-links__intro {
  @include body-type;
  max-width: 720px;
  color: $color-press-ink;
}

.contact-links__panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-30;

  @include respond-up(md) {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-links__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $spacing-10;
}

.contact-links__label {
  @include mono-caption;
  color: $color-press-ink;
}
</style>
