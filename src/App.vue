<template>
  <div class="p-4 shadow-xl bg-white">
    <image-select-area
      image-url="https://kruti.com.ua/ckeditor/kcfinder/upload/images/Pride_rocx81_3.jpg"
      :width="900"
      :height="700"
      :border-color="color"
      :border-width="lineWidth"
      @save-data="saveDataHandler"
    />

    <div class="shadow-inner p-4">
      <div class="flex justify-between">
        <label
          for="line_color"
          class="block mb-2 text-xl font-bolder text-gray-900 dark:text-white"
        >
          Select color:
        </label>
        <input
          type="color"
          id="line_color"
          v-model="color"
          class=" w-24
            bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
            focus:border-blue-500 block p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </div>

      <div class="flex justify-between mt-1">
        <label
          for="line_width"
          class="block mt-1 text-xl font-bolder text-gray-900 dark:text-white"
        >
          Select line width:
        </label>
        <input
          type="number"
          id="line_width"
          v-model="lineWidth"
          class=" w-24
            bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
            focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageSelectArea from 'vue3-image-multiselect-areas'

const color = ref<string>('#000000')
const lineWidth = ref<number>(2)

const saveDataHandler = (data: any) => {
  console.log('Save data parent handler : ', data)
}
</script>

<style scoped lang="scss">
:deep(.active-area) {
  background-color: RGBA(255,255,255,0.2);
}
:deep(.selected-area) {
  .delete-button {
    padding: 0.2rem;
    padding-bottom: 0;
    border-bottom-left-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;

    &:hover {
      background-color: rgb(226 232 240);
    }
  }
}
</style>
