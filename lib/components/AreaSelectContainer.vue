<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CanvasApiClass from '../utils/CanvasApiClass'
import SelectedAreaBlock from './SelectedAreaBlock.vue'
import { IAreaData } from '../types'

export interface IProps {
  id?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
  borderColor?: string,
  imageUrl: string,
  initAreas?: IAreaData[]
}

export type OperationType = 'dragging' | 'resize'
export type DirectionType = 'top' | 'down' | 'left' | 'right'

const props = withDefaults(defineProps<IProps>(), {
  id: 'vueCanvasRedactor',
  width: 500,
  height: 400,
  borderWidth: 2,
  borderColor: '#000000',
  initAreas: () => [],
})

const areasList = ref<IAreaData[]>([ ...props.initAreas ])
const activeAreaIndex = ref<number | null>(null)
const resizingItemStartPos = {
  direction: '',
}
let canvasApiObj: CanvasApiClass | null = null
let movingAreaIndex: number | null = null
let resizingAreaIndex: number | null = null

const selectedHandler = (e: CustomEvent) => {
  if (!e.detail) return

  const areaItem = {
    index: areasList.value.length,
    lineWidth: props.borderWidth,
    color: props.borderColor,
    comment: '',
    coordinates: { ...e.detail },
  }

  areasList.value.push(areaItem)
}

const areaDeleteHandler = (index: number) => {
  areasList.value.splice(index, 1)
}

const mouseDownHandler = (e: MouseEvent, index: number, operation: OperationType, direction: DirectionType) => {
  activeAreaIndex.value = index

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

      areasList.value[movingAreaIndex].coordinates.x += e.movementX
      areasList.value[movingAreaIndex].coordinates.y += e.movementY
    })
  } else if (resizingAreaIndex !== null) {
    switch (resizingItemStartPos.direction) {
      case 'left':
        areasList.value[resizingAreaIndex].coordinates.x += e.movementX
        areasList.value[resizingAreaIndex].coordinates.width -= e.movementX
        break
      case 'right':
        areasList.value[resizingAreaIndex].coordinates.width += e.movementX
        break
      case 'top':
        areasList.value[resizingAreaIndex].coordinates.y += e.movementY
        areasList.value[resizingAreaIndex].coordinates.height -= e.movementY
        break
      case 'down':
        areasList.value[resizingAreaIndex].coordinates.height += e.movementY
    }
  }
}

watch(() => props.borderColor, (value: string) => {
  if (activeAreaIndex.value !== null) {
    const a = areasList.value[activeAreaIndex.value]
    a.color = value
  }
  canvasApiObj?.setLineColor(value)
})

watch(() => props.borderWidth, (value: number) => {
  if (activeAreaIndex.value !== null) {
    const a = areasList.value[activeAreaIndex.value]
    a.lineWidth = value
  }
  canvasApiObj?.setLineWidth(value)
})

onMounted(() => {
  const canvasElement = document.getElementById(props.id) as HTMLCanvasElement

  if (canvasElement) {
    canvasApiObj = new CanvasApiClass(canvasElement, props.borderWidth, props.borderColor)
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
    @mousedown="activeAreaIndex = null"
  >
    <canvas
      :id="id"
      :width="width"
      :height="height"
      @area-selected="selectedHandler"
    />

    <selected-area-block
      v-for="(item, i) of areasList"
      :key="i"
      :area-data="item"
      :is-active="activeAreaIndex === i"
      @mousedown="mouseDownHandler"
      @mouseup="mouseUpHandler"
      @delete="areaDeleteHandler"
      @save-data="(data: IAreaData) => $emit('save-data', data)"
    />
  </div>
</template>

<style scoped>

</style>
