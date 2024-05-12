<template>
  <div class="min-h-[100vh] min-w-[100vw] flex items-center justify-center">
    <LoaderV1 v-if="loading" />
    <div class="w-full h-full flex items-start justify-start" v-if="!loading">
      <Sidebar />
      <ConversationLayout />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Sidebar from '@/components/Sidebar/Sidebar.vue'
import ConversationLayout from '@/components/Conversation/ConversationLayout.vue'
import LoaderV1 from '@/components/Loader/LoaderV1.vue'

import { echo } from '../../configs/echo'
import { getConversations } from '../../webServices/conversationService'
import { useHomeStore } from '../../stores/modules/homeStore'

export default defineComponent({
  components: { Sidebar, ConversationLayout, LoaderV1 },
  setup() {
    const homeStore = useHomeStore()

    const loading = ref(false)

    return { homeStore, loading }
  },
  watch: {},
  methods: {
    connectWs() {
      echo
        .join('online')
        .here(users => {
          const onlineUsersObj = Object.fromEntries(users.map(user => [user.id, user]))
          this.homeStore.onlineUsers = { ...this.homeStore.onlineUsers, ...onlineUsersObj }
          console.log('onlineUsers', this.homeStore.onlineUsers)
        })
        .joining(user => {
          this.homeStore.onlineUsers[user.id] = user
          console.log('updatedUsers', this.homeStore.onlineUsers)
        })
        .leaving(user => {
          delete this.homeStore.onlineUsers[user.id]
          console.log('updatedUsers', this.homeStore.onlineUsers)
        })
    },
    disconnectWs() {
      echo.leave('chat')
    },
    async loadData() {
      this.loading = true
      const data = await getConversations()
      console.log('conversations', data.conversations)
      if (data.success) {
        this.homeStore.updateConversations(data.conversations)
        this.homeStore.updateLocalConversations(data.conversations)
        this.homeStore.updateSortedConversations(data.conversations)
      }
      this.loading = false
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
