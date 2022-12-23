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

export type OperationType = 'dragging' | 'resize'
export type DirectionType = 'top' | 'down' | 'left' | 'right'

const props = withDefaults(defineProps<IProps>(), {
  id: 'vueCanvasRedactor',
  width: 500,
  height: 400,
  borderWidth: 2,
  borderColor: 'red',
})

const areasList = ref<ISelectedAreaCoordinates[]>([])
const draggingItemStartPos = {
  offsetX: 0,
  offsetY: 0,
}
const resizingItemStartPos = {
  direction: '',
}
let movingAreaIndex: number | null = null
let resizingAreaIndex: number | null = null

const selectedHandler = (e: CustomEvent) => {
  if (!e.detail) return

  areasList.value.push({ ...e.detail })
}

const areaDeleteHandler = (index: number) => {
  areasList.value.splice(index, 1)
}

const mouseDownHandler = (e: MouseEvent, index: number, operation: OperationType, direction: DirectionType) => {
  switch (operation) {
    case 'dragging':
      draggingItemStartPos.offsetY = e.offsetY
      draggingItemStartPos.offsetX = e.offsetX
      movingAreaIndex = index
      break
    case 'resize':
      resizingItemStartPos.direction = direction
      resizingAreaIndex = index
  }
}

const mouseUpHandler = () => {
  draggingItemStartPos.offsetY = 0
  draggingItemStartPos.offsetX = 0

  movingAreaIndex = null
  resizingAreaIndex = null
}

const mouseMoveHandler = (e: MouseEvent) => {
  if (movingAreaIndex !== null) {
    requestAnimationFrame(() => {
      if (movingAreaIndex === null) return

      areasList.value[movingAreaIndex].x = e.clientX - draggingItemStartPos.offsetX
      areasList.value[movingAreaIndex].y = e.clientY - draggingItemStartPos.offsetY
    })
  } else if (resizingAreaIndex !== null) {
    switch (resizingItemStartPos.direction) {
      case 'left':
        areasList.value[resizingAreaIndex].x += e.movementX
        areasList.value[resizingAreaIndex].width -= e.movementX
        break
      case 'right':
        areasList.value[resizingAreaIndex].width += e.movementX
        break
      case 'top':
        areasList.value[resizingAreaIndex].y += e.movementY
        areasList.value[resizingAreaIndex].height -= e.movementY
        break
      case 'down':
        areasList.value[resizingAreaIndex].height += e.movementY
    }
  }
}

const commentHandler = (text: string, index: number) => {
  console.log('COMMENT handler :: ', index, text)
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
    :style="`
      width: ${width}px;
      height: ${height}px;
      position: relative;
      background: url('https://cdn.britannica.com/99/143599-050-C3289491/Watermelon.jpg') no-repeat center;
      background-size: contain;
    `"
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
      :border-color="borderColor"
      :border-width="borderWidth"
      @mousedown="mouseDownHandler"
      @mouseup="mouseUpHandler"
      @delete="areaDeleteHandler"
      @comment-update="commentHandler"
    />
  </div>
</template>

<style scoped>
canvas {
  border: solid;
}
</style>
