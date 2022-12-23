<template>
  <div
    :style="`
      position: absolute;
      width: ${coordinates.width}px;
      height: ${coordinates.height}px;
      top: ${coordinates.y}px;
      left: ${coordinates.x}px;
      cursor: ew-resize;
      `
    "
  >
    <!-- Top border -->
    <div
      style="height: 2px; background: black; cursor: ns-resize; top: 0"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, index, 'resize', 'top')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', index, 'resize')
      }"
    />
    <!-- Left border -->
    <div
      style="width: 2px; height: 100%; background: black; cursor: ew-resize; position: absolute; left: 0; bottom: 0;"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, index, 'resize', 'left')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', index, 'resize')
      }"
    />

    <div
      :style="`
        width: 100%;
        height: 100%;
        cursor: ${cursor};
       `
      "
      class="selected-area"
      @mousedown="(e) => {
        e.stopPropagation()
        if (e.button === 2) return // If mouse right button clicked

        cursor = 'grabbing'
        $emit('mousedown', e, index, 'dragging')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        cursor = 'grab'
        $emit('mouseup', index, 'dragging')
      }"
      @contextmenu="(e) => { e.stopPropagation() }"
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
    <!-- Right border -->
    <div
      style="width: 2px; height: 100%; background: black; cursor: ew-resize; position: absolute; right: 0; bottom: 0;"
      class="RIGHT_BORDER"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, index, 'resize', 'right')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', index, 'resize')
      }"
    />
    <!-- Bottom border -->
    <div
      style="width: 100%; height: 2px; background: black; cursor: ns-resize; position: absolute; bottom: 0"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, index, 'resize', 'down')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', index, 'resize')
      }"
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