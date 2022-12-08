export default {
  moduleFileExtensions: [
    "ts",
    "vue",
    "js"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    ".*\\.(vue)$": "@vue/vue3-jest"
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    "customExportConditions": ["node", "node-addons"]
  }
}