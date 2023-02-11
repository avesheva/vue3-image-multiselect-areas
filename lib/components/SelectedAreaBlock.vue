<template>
  <div
    :style="`
      position: absolute;
      width: ${ areaData.coordinates.width }px;
      height: ${ areaData.coordinates.height }px;
      top: ${ areaData.coordinates.y }px;
      left: ${ areaData.coordinates.x }px;
    `"
    class="selected-area"
    :class="{ 'active-area': isActive }"
  >
    <!-- Top border -->
    <div
      :style="`height: ${ lineWidth }px; background: ${ areaData.color }; cursor: ns-resize; top: 0`"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, areaData.index, 'resize', 'top')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', areaData.index, 'resize')
      }"
    />
    <!-- Left border -->
    <div
      :style="`
        width: ${ lineWidth }px;
        background: ${ areaData.color };
        height: 100%;
        cursor: ew-resize;
        position: absolute;
        left: 0;
        bottom: 0;
      `"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, areaData.index, 'resize', 'left')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', areaData.index, 'resize')
      }"
    />

    <div
      :style="`
        width: 100%;
        height: 100%;
        cursor: ${cursor};
        user-select: none;
       `
      "
      @mousedown="(e) => {
        e.stopPropagation()
        if (e.button === 2) return // If mouse right button clicked

        cursor = 'grabbing'
        $emit('mousedown', e, areaData.index, 'dragging')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        cursor = 'grab'
        $emit('mouseup', areaData.index, 'dragging')
      }"
      @contextmenu="(e) => { e.stopPropagation() }"
    >
      <button
        :style="`position: absolute; right: ${ lineWidth }px;`"
        @click="$emit('delete', areaData.index)"
        class="delete-button"
      >
        &times;
      </button>
      <div
        contenteditable
        class="area-comment"
        style="
          position: absolute;
          top: calc(100% + 5px);
          min-width: 80px;
          max-width: 200px;
          background: white;
          padding: 0.5rem;
          text-align: left;
        "
        autofocus
        @input="commentInputHandler"
        @blur="commentFieldBlurHandler"
      >
        {{ areaData.comment }}
      </div>
    </div>
    <!-- Right border -->
    <div
      :style="`
        width: ${ lineWidth }px;
        height: 100%;
        background: ${ areaData.color };
        cursor: ew-resize;
        position: absolute;
        right: 0;
        bottom: 0;
      `"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, areaData.index, 'resize', 'right')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', areaData.index, 'resize')
      }"
    />
    <!-- Bottom border -->
    <div
      :style="`
        width: 100%;
        height: ${ lineWidth }px;
        background: ${ areaData.color };
        cursor: ns-resize;
        position: absolute;
        bottom: 0;
      `"
      @mousedown="(e) => {
        e.stopPropagation()
        $emit('mousedown', e, areaData.index, 'resize', 'down')
      }"
      @mouseup="(e) => {
        e.stopPropagation()
        $emit('mouseup', areaData.index, 'resize')
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { IAreaData } from '../types'

const props = defineProps<{
  areaData: IAreaData
  isActive: boolean,
}>()
const emit = defineEmits(['delete', 'mousedown', 'mouseup', 'save-data'])

const cursor = ref<string>('grab')
const lineWidth = computed(() => (props.areaData.lineWidth > 0 ? props.areaData.lineWidth : 1))
let commentText = '' // eslint-disable-line

const commentFieldBlurHandler = () => {
  const data = {
    ...props.areaData,
    comment: commentText,
  }

  emit('save-data', data)
}
const commentInputHandler = (e: Event) => {
  commentText = (e.currentTarget as HTMLElement)?.textContent || ''
}
</script>

<style scoped>

</style>