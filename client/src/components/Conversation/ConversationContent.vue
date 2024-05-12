<template>
  <div class="hidden md:flex-1 md:flex items-start justify-start">
    <div class="h-[100vh] relative flex-1 bg-themeSecondary rounded-r-2xl overflow-hidden">
      <div v-if="!selectedConversation" class="text-center mt-6 px-8">Please select conversation to see messages.</div>
      <div v-if="selectedConversation">
        <ConversationHeader :conversation="selectedConversation" :toggleOpen="toggleOpen" />
        <div v-if="loading" class="min-h-[100vh] flex items-center justify-center">
          <span class="loading loading-spinner text-white"></span>
        </div>
        <div v-if="!loading">
          <div v-if="localMessages.length === 0" class="min-h-[80vh] flex items-center justify-center">No messages found.</div>
          <div v-else :style="{ height: `calc(100vh - 96px - 64px)` }" class="overflow-auto mt-24 mb-16 px-8" ref="messagesContainer">
            <div v-for="(message, index) in localMessages" :key="message.id" class="mb-1">
              <MessageItem :message="message" :previousMessage="getPreviousMessage(index)" />
            </div>
          </div>
        </div>
        <MessageInput :conversation="selectedConversation" />
      </div>
    </div>
    <ConversationAttachment v-if="isOpen" class="w-[35%]" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect, nextTick } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import ConversationAttachment from '@/components/Conversation/ConversationAttachment.vue'
import ConversationHeader from '@/components/Conversation/ConversationHeader.vue'
import MessageItem from '@/components/Message/MessageItem.vue'
import MessageInput from '@/components/Message/MessageInput.vue'

import { getMessageByUser, getMessageByGroup } from '../../webServices/messageService'
export default defineComponent({
  components: { ConversationHeader, ConversationAttachment, MessageItem, MessageInput },
  props: {},
  setup() {
    const homeStore = useHomeStore()

    const selectedConversation = ref(homeStore.selectedConversation)
    const localMessages = ref([])
    const isOpen = ref(false)
    const loading = ref(false)

    const messagesContainer = ref(null)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const loadData = async () => {
      if (!selectedConversation.value) return
      loading.value = true
      if (selectedConversation.value.is_user) {
        const data = await getMessageByUser({ id: selectedConversation.value.id })
        localMessages.value = [...data.messages.reverse()]
      } else {
        const data = await getMessageByGroup({ id: selectedConversation.value.id })
        localMessages.value = [...data.messages.reverse()]
      }
      loading.value = false

      await nextTick()
      scrollToBottom()
    }

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    watchEffect(() => {
      selectedConversation.value = homeStore.selectedConversation
      isOpen.value = false
      loadData()
    })

    return {
      selectedConversation,
      localMessages,
      isOpen,
      loading,
      messagesContainer,
      toggleOpen
    }
  },
  methods: {
    getPreviousMessage(index) {
      if (index > 0) {
        return this.localMessages[index - 1]
      }
      return null
    }
  },
  created() {}
})
</script>

<style></style>
