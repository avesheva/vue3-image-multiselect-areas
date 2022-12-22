<template>
  <div
    :style="`
      position: absolute;
      width: ${coordinates.width}px;
      height: ${coordinates.height}px;
      top: ${coordinates.y}px;
      left: ${coordinates.x}px;
      border: solid 2px;
      cursor: grab;
      `
    "
    class="selected-area"
    @mousedown="(e) => { $emit('mousedown', e, index) }"
    @mouseup="$emit('mouseup', index)"
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

const changeHandler = (e: InputEvent) => {
  console.log('CHANGE handler :: ', e.target)
}
</script>

<style scoped>

</style>