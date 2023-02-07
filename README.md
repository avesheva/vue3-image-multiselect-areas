# vue3-image-multiselect-areas

Vue 3 typescript lib, with ability to select area on the image and leave comments.

[screencast-localhost_5173-2023.01.17-22_55_14.webm](https://user-images.githubusercontent.com/12416010/213011116-b1cd6685-4596-4137-b8b5-945b098143ac.webm)

## Installation
```shell
# with npm
npm install vue3-image-multiselect-areas
```
```shell
# with yarn
yarn add vue3-image-multiselect-areas
```

## Basic usage
```vue
import ImageSelectArea from 'vue3-image-multiselect-areas';
```
```vue
<image-select-area
  image-url="https://yourimageurl.jpg"
  :width="900"
  :height="700"
  border-color="#0FB839"
  border-width="2"
  @save-data="saveDataHandler"
/>
```

## Types
```typescript
interface IAreaData {
  index: number,
  lineWidth: number,
  color: string,
  comment: string,
  coordinates: {
    width: number,
    height: number,
    x: number,
    y: number,
  },
}
```

## Props
| NAME              | TYPE         | DEFAULT                  | DESCRIPTION                |
|-------------------|--------------|--------------------------|----------------------------|
| imageUrl          | String       |              -           | Image url. Required        |
| id?               | String       | imageSelectArea          | Component id               |
| width? (px)       | Number       | 500                      | Component width            |
| height? (px)      | Number       | 400                      | Component height           |
| borderWidth? (px) | Number       | 1                        | Selected area border width |
| borderColor?      | String       | #000000                  | Selected area border color |
| initAreas?        | IAreaData[]  | imageSelectArea          | Preinited areas values     |


## Events
| NAME      | PARAMS TYPE | DESCRIPTION                                                        |
|-----------|-------------|--------------------------------------------------------------------|
| save-data | IAreaData[] | Fires after area resizing, dragging or comments field focus losing |
