<template>
  <div>
    <Sidebar />
    <div>Chat layout</div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import Sidebar from '../../components/Sidebar/Sidebar.vue'

import { echo } from '../../configs/echo'
import { getConversations } from '../../webServices/conversationService'

export default defineComponent({
  components: { Sidebar },
  setup() {
    const conversations = ref([])
    const selectedConversation = ref([])
    const localConversations = ref([])
    const sortedConversations = ref([])

    const onlineUsers = ref({})
    const isUserOnline = userId => onlineUsers[userId]

    return { conversations, selectedConversation, localConversations, sortedConversations, onlineUsers, isUserOnline }
  },
  watch: {
    'this.conversations'() {
      this.localConversations = this.conversations
    },
    'this.localConversations'() {
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
    }
  },
  methods: {
    connectWs() {
      echo
        .join('chat')
        .here(users => {
          const onlineUsersObj = Object.fromEntries(users.map(user => [user.id, user]))
          this.onlineUsers = { ...this.onlineUsers, ...onlineUsersObj }
          console.log('onlineUsers', this.onlineUsers)
        })
        .joining(user => {
          const updatedUsers = { ...this.onlineUsers }
          updatedUsers[user.id] = user
          console.log('updatedUsers', updatedUsers)
          return updatedUsers
        })
        .leaving(user => {
          const updatedUsers = { ...this.onlineUsers }
          delete updatedUsers[user.id]
          console.log('updatedUsers', updatedUsers)
          return updatedUsers
        })
    },
    disconnectWs() {
      echo.leave('chat')
    },
    async loadData() {
      const data = await getConversations()
      console.log(data)
      if (data.success) this.conversations = [...data.conversations]
    }
  },
  created() {
    this.connectWs()
    this.loadData()
  },
  beforeUnmount() {
    this.disconnectWs()
  }
})
</script>

<style></style>
