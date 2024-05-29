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
import { defineComponent, ref, watch, watchEffect } from 'vue'

import Sidebar from '@/components/Sidebar/Sidebar.vue'
import ConversationLayout from '@/components/Conversation/ConversationLayout.vue'
import LoaderV1 from '@/components/Loader/LoaderV1.vue'

import { echo } from '../../configs/echo'
import { getConversations } from '../../webServices/conversationService'
import { useHomeStore } from '../../stores/modules/homeStore'
import { useUserStore } from '../../stores/modules/userStore'

export default defineComponent({
  components: { Sidebar, ConversationLayout, LoaderV1 },
  setup() {
    const homeStore = useHomeStore()
    const userStore = useUserStore()

    const loading = ref(false)

    watchEffect(onCleanup => {
      homeStore.conversations.forEach(conversation => {
        let channel = `message.group.${conversation.id}`

        if (conversation.is_user) {
          channel = `message.user.${[parseInt(userStore.user.id), parseInt(conversation.id)].sort((a, b) => a - b).join('-')}`
        }

        echo
          .private(channel)
          .subscribed(() => {
            console.log(`Tham gia thành công kênh: ${channel}`)
          })
          .error(error => {
            console.log(error)
          })
          .listen('SocketMessage', e => {
            console.log('SocketMessage', e)
            const message = e.message

            // if the conversation with the sender is not selected
            // then show a notification

            // emit('message.created', message)
            if (message.sender_id === userStore.user.id) {
              return
            }
            // emit('newMessageNotification', {
            //   user: message.sender,
            //   group_id: message.group_id,
            //   message: message.message || `Shared ${message.attachments.length === 1 ? 'an attachment' : message.attachments.length + ' attachments'}  `
            // })
          })
      })

      onCleanup(() => {
        homeStore.conversations.forEach(conversation => {
          let channel = `message.group.${conversation.id}`

          if (conversation.is_user) {
            channel = `message.user.${[parseInt(userStore.user.id), parseInt(conversation.id)].sort((a, b) => a - b).join('-')}`
          }
          echo.leave(channel)
        })
      })
    })

    return { homeStore, userStore, loading }
  },
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
