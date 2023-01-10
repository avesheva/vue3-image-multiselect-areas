<template>
  <div>
    <image-select-area
      image-url="https://velogo.com.ua/uploads/images/blog/ROCX-83_2020/IMG_4070.jpg?1572099078425"
      :width="1200"
      :height="900"
      border-color="white"
      @save-data="saveDataHandler"
    />
  </div>
</template>

<script setup lang="ts">
import ImageSelectArea from '../lib'

const saveDataHandler = (data) => {
  console.log('Save data handler : ', data)
}
</script>

<style scoped>

</style>
