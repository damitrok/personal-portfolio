<script setup lang="ts">
import { AboutSection } from '@/widgets/about-section'

const { t } = useI18n()
useHead({ title: t('about.title') })
</script>

<template>
  <AboutSection />
</template>
