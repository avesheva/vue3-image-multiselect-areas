<template>
  <div
    :style="`
      position: absolute;
      width: ${coordinates.width}px;
      height: ${coordinates.height}px;
      top: ${coordinates.y}px;
      left: ${coordinates.x}px;
      border: solid 2px;`
    "
  >
    <span>Index: {{ index }}</span>
    <button
      style="position: absolute; right: 0;"
      @click="$emit('delete', index)"
    >
      &times;
    </button>
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

defineEmits(['delete'])
</script>

<style scoped>

</style>