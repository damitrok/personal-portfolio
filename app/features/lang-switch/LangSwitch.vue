<script setup lang="ts">
import { Pill } from '@/shared/ui'

const { locale, setLocale } = useI18n()

const otherLocale = computed<'en' | 'ru'>(() => (locale.value === 'en' ? 'ru' : 'en'))

function toggleLocale() {
  setLocale(otherLocale.value)
}
</script>

<template>
  <Pill as="button" type="button" @click="toggleLocale">
    {{ otherLocale.toUpperCase() }}
  </Pill>
</template>
