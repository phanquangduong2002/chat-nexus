<template>
  <div class="flex items-start justify-start">
    <Sidebar />
    <ConversationLayout />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import ConversationLayout from '@/components/Conversation/ConversationLayout.vue'
import { echo } from '../../configs/echo'
import { getConversations } from '../../webServices/conversationService'
import { useHomeStore } from '../../stores/modules/homeStore'

export default defineComponent({
  components: { Sidebar, ConversationLayout },
  setup() {
    const homeStore = useHomeStore()
    return { homeStore }
  },
  watch: {},
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
      console.log('conversations', data.conversations)
      if (data.success) {
        this.homeStore.updateConversations(data.conversations)
        this.homeStore.updateLocalConversations(data.conversations)
        this.homeStore.updateSortedConversations(data.conversations)
      }
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
