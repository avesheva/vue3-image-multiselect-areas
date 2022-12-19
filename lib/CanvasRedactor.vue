<script setup lang="ts">
import { onMounted } from 'vue'
import CanvasApiClass from './utils/CanvasApiClass'

export interface Props {
  id?: string,
  width?: number,
  height?: number,
}

const props = withDefaults(defineProps<Props>(), {
  id: 'vueCanvasRedactor',
  width: 400,
  height: 300,
})

onMounted(() => {
  const canvasElement = document.getElementById(props.id) as HTMLCanvasElement

  if (canvasElement) {
    const canvasApiObject = new CanvasApiClass(canvasElement)

    console.log('CANVAS API object :: ', canvasApiObject)
  }
})

</script>

<template>
  <canvas
    :id="id"
    :width="width"
    :height="height"
  />
</template>

<style scoped>
canvas {
  border: solid;
}
</style>
