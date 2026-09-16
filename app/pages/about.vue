<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('about.title') })
</script>

<template>
  <section class="about-page">
    <h1>{{ t('about.title') }}</h1>
  </section>
</template>
