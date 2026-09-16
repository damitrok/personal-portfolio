<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('stack.title') })
</script>

<template>
  <section class="stack-page">
    <h1>{{ t('stack.title') }}</h1>
  </section>
</template>
