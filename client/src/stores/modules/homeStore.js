import { defineStore } from 'pinia'
import { HOME_STORE } from './../../configs/storeTypes'

export const useHomeStore = defineStore(
  HOME_STORE,
  {
    state: () => ({}),
    actions: {}
  },
  {
    persist: true
  }
)

export default {
  useHomeStore
}
