<script setup lang="ts">
import { StackGrid } from '@/widgets/stack-grid'

const { t } = useI18n()
useHead({ title: t('stack.title') })
</script>

<template>
  <StackGrid />
</template>
