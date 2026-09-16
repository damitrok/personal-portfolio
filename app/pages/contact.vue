<script setup lang="ts">
import { ContactLinks } from '@/widgets/contact-links'

const { t } = useI18n()
useHead({ title: t('contact.title') })
</script>

<template>
  <ContactLinks />
</template>
