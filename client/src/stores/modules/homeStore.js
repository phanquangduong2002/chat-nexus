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
    updateConversations(conversations) {
      this.conversations = [...conversations]
    },
    updateLocalConversations(conversations) {
      this.localConversations = [...conversations]
    },
    updateSortedConversations(conversations) {
      this.sortedConversations = [...conversations]
      this.sortedConversations.sort((a, b) => {
        if (a.blocked_at && b.blocked_at) {
          return a.blocked_at > b.blocked_at ? 1 : -1
        } else if (a.blocked_at) {
          return 1
        } else if (b.blocked_at) {
          return -1
        }

        if (a.last_message_date && b.last_message_date) {
          return b.last_message_date.localeCompare(a.last_message_date)
        } else if (a.last_message_date) {
          return -1
        } else if (b.last_message_date) {
          return 1
        } else {
          return 0
        }
      })
    },
    isUserOnline(userId) {
      return this.onlineUsers[userId]
    }
  }
})

export default {
  useHomeStore
}
