<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CanvasApiClass from './utils/CanvasApiClass'
import SelectedAreaBlock from './components/SelectedAreaBlock.vue'

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

const areasList = ref<unknown[]>([])

const selectedHandler = (e: CustomEvent) => {
  if (!e.detail) return

  areasList.value.push(e.detail)
}

onMounted(() => {
  const canvasElement = document.getElementById(props.id) as HTMLCanvasElement

  if (canvasElement) {
    new CanvasApiClass(canvasElement)
  }
})

</script>

<template>
  <div style="position: relative">
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
    />
  </div>
</template>

<style scoped>
canvas {
  border: solid;
}
</style>
