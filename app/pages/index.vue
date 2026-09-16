<script setup lang="ts">
import { Hero } from '@/widgets/hero'

const { t } = useI18n()
useHead({ title: t('home.hero.role') })
</script>

<template>
  <Hero />
</template>
