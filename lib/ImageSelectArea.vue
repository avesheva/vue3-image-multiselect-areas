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
  imageUrl: string,
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
  borderColor: 'black',
})

const areasList = ref<ISelectedAreaCoordinates[]>([])
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
      movingAreaIndex = index
      break
    case 'resize':
      resizingItemStartPos.direction = direction
      resizingAreaIndex = index
  }
}

const mouseUpHandler = () => {
  movingAreaIndex = null
  resizingAreaIndex = null
}

const mouseMoveHandler = (e: MouseEvent) => {
  if (movingAreaIndex !== null) {
    requestAnimationFrame(() => {
      if (movingAreaIndex === null) return

      areasList.value[movingAreaIndex].x += e.movementX
      areasList.value[movingAreaIndex].y += e.movementY
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
    new CanvasApiClass(canvasElement, props.borderWidth, props.borderColor)
  }
})

</script>

<template>
  <div
    :style="`
      width: ${ width }px;
      height: ${ height }px;
      position: relative;
      background: url('${ imageUrl }') no-repeat center;
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
