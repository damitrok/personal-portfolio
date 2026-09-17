<script setup lang="ts">
const { t } = useI18n()

useHead({
  meta: [{ name: 'description', content: () => t('home.hero.tagline') }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
