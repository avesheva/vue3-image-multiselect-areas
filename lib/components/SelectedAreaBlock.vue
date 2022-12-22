<template>
  <div
    :style="`
      position: absolute;
      width: ${coordinates.width}px;
      height: ${coordinates.height}px;
      top: ${coordinates.y}px;
      left: ${coordinates.x}px;
      border: solid 2px;
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