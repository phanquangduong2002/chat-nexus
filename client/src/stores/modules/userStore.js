import { defineStore } from 'pinia'
import { USER_STORE } from './../../configs/storeTypes'
import { removeUserStoreStore, localEnUserStore } from './../../configs/connectServer'

export const useUserStore = defineStore(USER_STORE, {
  state: () => ({
    user: null
  }),
  actions: {
    login(accToken, user) {
      localEnUserStore(accToken)
      this.user = user
    },
    logout() {
      removeUserStoreStore()
      this.user = null
    }
  },
  persist: true
})

export default {
  useUserStore
}
