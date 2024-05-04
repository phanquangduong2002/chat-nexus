import { defineStore } from 'pinia'
import { USER_STORE } from './../../configs/storeTypes'
import {
  removeUserStore,
  removeRefreshUserStore,
  localEnUserStore,
  localEnRefreshUserStore,
  localUserObjStore,
  removeUserObjStore
} from './../../configs/connectServer'

export const useUserStore = defineStore(USER_STORE, {
  state: () => ({
    user: null
  }),
  actions: {
    login(accToken, refToken, user) {
      localEnUserStore(accToken)
      localEnRefreshUserStore(refToken)
      localUserObjStore(user)
      this.user = user
    },
    logout() {
      removeUserStore()
      removeRefreshUserStore()
      removeUserObjStore()
      this.user = null
    }
  }
})

export default {
  useUserStore
}
