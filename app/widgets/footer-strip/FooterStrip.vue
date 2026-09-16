<script setup lang="ts">
import { MonoTag } from '@/shared/ui'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer-strip">
    <span class="footer-strip__wordmark">{{ t('home.hero.name') }}</span>
    <MonoTag class="footer-strip__tag">{{ t('home.hero.role') }}</MonoTag>
    <span class="footer-strip__copyright">{{ t('footer.copyright', { year }) }}</span>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;
@use '@/shared/styles/mixins' as *;

.footer-strip {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-20;
  align-items: center;
  text-align: center;
  padding: $spacing-30 $spacing-20;
  @include hairline-border($side: top);

  @include respond-up(md) {
    grid-template-columns: 1fr auto 1fr;
    text-align: left;
  }
}

.footer-strip__wordmark {
  font-family: $font-sans;
  font-weight: $weight-medium;
  font-size: $text-body;
}

.footer-strip__tag {
  justify-self: center;
}

.footer-strip__copyright {
  font-family: $font-sans;
  font-size: $text-body;

  @include respond-up(md) {
    justify-self: end;
    text-align: right;
  }
}
</style>
