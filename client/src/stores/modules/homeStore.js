import { defineStore } from 'pinia'
import { HOME_STORE } from './../../configs/storeTypes'

export const useHomeStore = defineStore(HOME_STORE, {
  state: () => ({
    conversations: [],
    selectedConversation: null,
    localConversations: [],
    sortedConversations: [],
    onlineUsers: {}
  }),
  actions: {
    isUserOnline(userId) {
      return this.onlineUsers[userId]
    }
  }
})

export default {
  useHomeStore
}
