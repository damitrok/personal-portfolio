<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import type { Euler, Group, Vector3 } from 'three'
import gsap from 'gsap'

const props = defineProps<{ reducedMotion: boolean; compact: boolean }>()

const groupRef = shallowRef<Group>()
let idleTween: gsap.core.Tween | undefined
let pointerX: gsap.QuickToFunc | undefined
let pointerY: gsap.QuickToFunc | undefined

// Tres position/rotation/scale props type strictly as Vector3/Euler, but
// their runtime setter also accepts a plain [x, y, z] array and calls
// .set(...) on the real vector — this version's generated types just
// don't include that documented shorthand. These helpers keep the plain
// array at runtime (the part that's actually verified working) while
// satisfying the stricter prop types.
const v3 = (x: number, y: number, z: number) => [x, y, z] as unknown as Vector3
const e3 = (x: number, y: number, z: number) => [x, y, z] as unknown as Euler

// Offset to the side on wide viewports (a companion to the headline, not
// competing with it); centered and smaller on narrow ones, where a
// perspective camera's visible horizontal range is too narrow for the
// same offset to stay in frame.
const groupPos = computed(() => (props.compact ? v3(1.1, -2.85, -0.6) : v3(3.1, -2.6, -0.6)))
const groupScale = computed(() => (props.compact ? v3(0.38, 0.38, 0.38) : v3(0.65, 0.65, 0.65)))
const headPos = v3(0, 1.6, 0)
const torsoPos = v3(0, 0.95, 0)
const armLPos = v3(-0.5, 1.1, 0.15)
const armLRot = e3(0.9, 0, -0.5)
const armRPos = v3(0.5, 1.1, 0.15)
const armRRot = e3(0.9, 0, 0.5)
const forearmLPos = v3(-0.42, 0.7, 0.55)
const forearmLRot = e3(1.5, 0, -0.2)
const forearmRPos = v3(0.42, 0.7, 0.55)
const forearmRRot = e3(1.5, 0, 0.2)
const laptopBasePos = v3(0, 0.42, 0.72)
const laptopScreenPos = v3(0, 0.72, 0.5)
const laptopScreenRot = e3(-0.35, 0, 0)
const screenPanelPos = v3(0, 0.72, 0.52)

function handlePointerMove(event: PointerEvent) {
  if (props.reducedMotion || !groupRef.value) return
  const nx = (event.clientX / window.innerWidth) * 2 - 1
  const ny = (event.clientY / window.innerHeight) * 2 - 1
  pointerX?.(ny * 0.15 + 0.05)
  pointerY?.(nx * 0.35)
}

onMounted(() => {
  if (!groupRef.value) return

  if (props.reducedMotion) {
    groupRef.value.rotation.y = 0.4
    return
  }

  pointerX = gsap.quickTo(groupRef.value.rotation, 'x', { duration: 0.6, ease: 'power2.out' })
  pointerY = gsap.quickTo(groupRef.value.rotation, 'y', { duration: 0.6, ease: 'power2.out' })
  groupRef.value.rotation.y = 0.4

  idleTween = gsap.to(groupRef.value.position, {
    y: '+=0.12',
    duration: 2.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  })

  window.addEventListener('pointermove', handlePointerMove)
})

onBeforeUnmount(() => {
  idleTween?.kill()
  window.removeEventListener('pointermove', handlePointerMove)
})

defineExpose({ groupRef })
</script>

<template>
  <TresGroup ref="groupRef" :position="groupPos" :scale="groupScale">
    <!-- head -->
    <TresMesh :position="headPos" cast-shadow>
      <TresIcosahedronGeometry :args="[0.32, 0]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>

    <!-- torso -->
    <TresMesh :position="torsoPos" cast-shadow>
      <TresCylinderGeometry :args="[0.42, 0.34, 1.05, 6]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>

    <!-- upper arms -->
    <TresMesh :position="armLPos" :rotation="armLRot" cast-shadow>
      <TresCylinderGeometry :args="[0.1, 0.1, 0.55, 5]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>
    <TresMesh :position="armRPos" :rotation="armRRot" cast-shadow>
      <TresCylinderGeometry :args="[0.1, 0.1, 0.55, 5]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>

    <!-- forearms, angled down to the keyboard -->
    <TresMesh :position="forearmLPos" :rotation="forearmLRot" cast-shadow>
      <TresCylinderGeometry :args="[0.09, 0.09, 0.5, 5]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>
    <TresMesh :position="forearmRPos" :rotation="forearmRRot" cast-shadow>
      <TresCylinderGeometry :args="[0.09, 0.09, 0.5, 5]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>

    <!-- laptop base -->
    <TresMesh :position="laptopBasePos" cast-shadow receive-shadow>
      <TresBoxGeometry :args="[0.78, 0.05, 0.5]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>

    <!-- laptop screen -->
    <TresMesh :position="laptopScreenPos" :rotation="laptopScreenRot" cast-shadow>
      <TresBoxGeometry :args="[0.78, 0.5, 0.03]" />
      <TresMeshStandardMaterial color="#121212" :flat-shading="true" />
    </TresMesh>
    <TresMesh :position="screenPanelPos" :rotation="laptopScreenRot">
      <TresPlaneGeometry :args="[0.62, 0.36]" />
      <TresMeshStandardMaterial color="#f1f1f1" :emissive="'#ffffff'" :emissive-intensity="0.15" />
    </TresMesh>
  </TresGroup>
</template>
