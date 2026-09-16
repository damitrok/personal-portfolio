<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Vector3 } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/shared/lib/useReducedMotion'
import DeveloperFigure from './DeveloperFigure.vue'

// See DeveloperFigure.vue's `v3` helper — same type/runtime gap for
// TresPerspectiveCamera's position/look-at and TresDirectionalLight's position.
const v3 = (x: number, y: number, z: number) => [x, y, z] as unknown as Vector3

const { prefersReducedMotion } = useReducedMotion()
const canvasWrapRef = ref<HTMLElement>()
let scrollTrigger: ScrollTrigger | undefined

// The figure sits off to one side on wide viewports; a perspective camera's
// visible horizontal range shrinks with the container's aspect ratio, so
// that same offset falls outside the frame on a narrow/tall mobile canvas.
// Swap to a centered, closer framing below the `md` breakpoint instead.
const isCompact = ref(false)
function updateIsCompact() {
  isCompact.value = window.innerWidth < 768
}

const cameraPos = computed(() => (isCompact.value ? v3(0, 0.6, 4.2) : v3(0, 1, 6)))
const cameraLookAt = computed(() => (isCompact.value ? v3(0, -0.4, 0) : v3(0.6, -0.1, 0)))
const lightPos = v3(2, 4, 3)

onMounted(() => {
  updateIsCompact()
  window.addEventListener('resize', updateIsCompact)

  const el = canvasWrapRef.value
  if (prefersReducedMotion.value || !el) return

  gsap.registerPlugin(ScrollTrigger)
  scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      gsap.set(el, {
        opacity: 1 - self.progress * 0.8,
        scale: 1 - self.progress * 0.15
      })
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsCompact)
  scrollTrigger?.kill()
})
</script>

<template>
  <div ref="canvasWrapRef" class="hero-scene">
    <ClientOnly>
      <TresCanvas :alpha="true" :clear-color="'#00000000'">
        <TresPerspectiveCamera :position="cameraPos" :look-at="cameraLookAt" />
        <TresAmbientLight :intensity="0.7" />
        <TresDirectionalLight :position="lightPos" :intensity="1.1" cast-shadow />
        <DeveloperFigure :reduced-motion="prefersReducedMotion" :compact="isCompact" />
      </TresCanvas>

      <template #fallback>
        <div class="hero-scene__fallback" aria-hidden="true" />
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables' as *;

.hero-scene {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-scene__fallback {
  position: absolute;
  inset: 0;
  background: $surface-paper;
  border-radius: $radius-cards;
}
</style>
