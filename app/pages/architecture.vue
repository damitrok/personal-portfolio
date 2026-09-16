<script setup lang="ts">
import { ArchitectureCaseStudy } from '@/widgets/architecture-case-study'

const { t } = useI18n()
useHead({ title: t('architecture.title') })
</script>

<template>
  <ArchitectureCaseStudy />
</template>
