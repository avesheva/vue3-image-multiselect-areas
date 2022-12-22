<template>
  <div
    :style="`
      position: absolute;
      width: ${coordinates.width}px;
      height: ${coordinates.height}px;
      top: ${coordinates.y}px;
      left: ${coordinates.x}px;
      cursor: ew-resize;
      border-left: solid 2px;
      border-right: solid 2px;
      `
    "
  >
    <div style="height: 2px; background: black; cursor: ns-resize;" />

    <div
      :style="`
        width: 100%;
        height: 100%;
        cursor: ${cursor};
       `
      "
      class="selected-area"
      @mousedown="(e) => {
        cursor = 'grabbing'
        $emit('mousedown', e, index)
      }"
      @mouseup="() => {
        cursor = 'grab'
        $emit('mouseup', index)
      }"
    >
      <button
        style="position: absolute; right: 0;"
        @click="$emit('delete', index)"
      >
        &times;
      </button>

      <textarea
        style="position: absolute; top: calc(100% + 5px)"
        @input="changeHandler"
      />
    </div>

    <div style="height: 2px; background: black; cursor: ns-resize;" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  index: number,
  coordinates: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
}>()

defineEmits(['delete', 'mousedown', 'mouseup'])

const cursor = ref<string>('grab')
const changeHandler = (e: InputEvent) => {
  console.log('CHANGE handler :: ', e.target)
}
</script>

<style scoped>

</style>