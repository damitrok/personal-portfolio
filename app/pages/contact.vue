<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('contact.title') })
</script>

<template>
  <section class="contact-page">
    <h1>{{ t('contact.title') }}</h1>
  </section>
</template>
