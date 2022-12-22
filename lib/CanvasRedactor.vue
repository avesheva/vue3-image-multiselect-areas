<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CanvasApiClass from './utils/CanvasApiClass'
import SelectedAreaBlock from './components/SelectedAreaBlock.vue'

export interface IProps {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
}

export interface ISelectedAreaCoordinates {
  x: number,
  y: number,
  width: number,
  height: number,
}

const props = withDefaults(defineProps<IProps>(), {
  id: 'vueCanvasRedactor',
  width: 400,
  height: 300,
  borderWidth: 2,
  borderColor: 'red',
})

const areasList = ref<ISelectedAreaCoordinates[]>([])
const draggingItemStartPos = {
  offsetX: 0,
  offsetY: 0,
}
let movingAreaIndex: number | null = null

const selectedHandler = (e: CustomEvent) => {
  if (!e.detail) return

  areasList.value.push({ ...e.detail })
}

const areaDeleteHandler = (index: number) => {
  areasList.value.splice(index, 1)
}

const mouseDownHandler = (e: MouseEvent, index: number) => {
  draggingItemStartPos.offsetY = e.offsetY
  draggingItemStartPos.offsetX = e.offsetX

  movingAreaIndex = index
}

const mouseUpHandler = () => {
  draggingItemStartPos.offsetY = 0
  draggingItemStartPos.offsetX = 0

  movingAreaIndex = null
}

const mouseMoveHandler = (e: MouseEvent) => {
  if (movingAreaIndex !== null) {
    requestAnimationFrame(() => {
      if (movingAreaIndex === null) return

      areasList.value[movingAreaIndex].x = e.clientX - draggingItemStartPos.offsetX
      areasList.value[movingAreaIndex].y = e.clientY - draggingItemStartPos.offsetY
    })
  }
}

onMounted(() => {
  const canvasElement = document.getElementById(props.id) as HTMLCanvasElement

  if (canvasElement) {
    new CanvasApiClass(canvasElement)
  }
})

</script>

<template>
  <div
    style="position: relative"
    @mousemove="mouseMoveHandler"
  >
    <canvas
      :id="id"
      :width="width"
      :height="height"
      @area-selected="selectedHandler"
    />

    <selected-area-block
      v-for="(coordinates, i) of areasList"
      :key="i"
      :index="i"
      :coordinates="coordinates"
      @mousedown="mouseDownHandler"
      @mouseup="mouseUpHandler"
      @delete="areaDeleteHandler"
    />
  </div>
</template>

<style scoped>
canvas {
  border: solid;
}
</style>
