<script setup lang="ts">
import { onMounted } from 'vue'
import CanvasApiClass from './utils/CanvasApiClass'

export interface Props {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
}

const props = withDefaults(defineProps<Props>(), {
  id: 'vueCanvasRedactor',
  width: 400,
  height: 300,
  borderWidth: 2,
  borderColor: 'red',
})

let container: HTMLElement | null = null

const selectedHandler = (e: CustomEvent) => {
  if (!e.detail || !container) return

  const div = document.createElement('div')
  div.style.width = `${ e.detail.width }px`
  div.style.height = `${ e.detail.height }px`
  div.style.position = 'absolute'
  div.style.border = `solid ${ props.borderColor } ${ props.borderWidth }px`
  div.style.top = `${ e.detail.y }px`
  div.style.left = `${ e.detail.x }px`

  container.appendChild(div)
}

onMounted(() => {
  const canvasElement = document.getElementById(props.id) as HTMLCanvasElement
  container = document.getElementById('redactorContainer')

  if (canvasElement) {
    new CanvasApiClass(canvasElement)
  }
})

</script>

<template>
  <div
    id="redactorContainer"
    style="position: relative"
  >
    <canvas
      :id="id"
      :width="width"
      :height="height"
      @area-selected="selectedHandler"
    />
  </div>
</template>

<style scoped>
canvas {
  border: solid;
}
</style>
