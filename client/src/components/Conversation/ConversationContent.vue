<template>
  <div class="hidden sm:flex-1 sm:flex items-start justify-start">
    <div class="h-[100vh] relative flex-1 bg-themeSecondary rounded-r-2xl overflow-hidden">
      <p v-if="!selectedConversation" class="text-center">Please select conversation to see messages.</p>
      <div v-if="selectedConversation">
        <ConversationHeader :conversation="selectedConversation" :toggleOpen="toggleOpen" />
        <div v-if="localMessages.length === 0" class="min-h-[50vh] flex items-center justify-center">No messages found.</div>
        <div v-else class="h-[100vh] overflow-auto mt-[110px] px-8">
          <div v-for="(message, index) in localMessages" :key="message.id" class="mb-1">
            <MessageItem :message="message" :previousMessage="getPreviousMessage(index)" />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
    <ConversationAttachment v-if="isOpen" class="w-[30%]" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import ConversationAttachment from '@/components/Conversation/ConversationAttachment.vue'
import ConversationHeader from '@/components/Conversation/ConversationHeader.vue'
import MessageItem from '@/components/Message/MessageItem.vue'
import MessageInput from '@/components/Message/MessageInput.vue'
export default defineComponent({
  components: { ConversationHeader, ConversationAttachment, MessageItem, MessageInput },
  props: {},
  setup() {
    const homeStore = useHomeStore()

    const selectedConversation = ref(homeStore.selectedConversation)

    const localMessages = ref([
      {
        id: 1,
        message: 'Hello',
        name: 'Quangduong'
      },
      {
        id: 2,
        message: 'Hi',
        name: 'Quangduong'
      },
      {
        id: 3,
        message: 'Love',
        name: 'User'
      },
      {
        id: 4,
        message: 'Love',
        name: 'User'
      },
      {
        id: 5,
        message: 'Love',
        name: 'Quangduong'
      },
      {
        id: 6,
        message: 'Love',
        name: 'User'
      },
      {
        id: 7,
        message: 'Love',
        name: 'User'
      },
      {
        id: 8,
        message: 'Love',
        name: 'User'
      }
    ])

    const isOpen = ref(false)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const getPreviousMessage = index => {
      if (index > 0) {
        return localMessages.value[index - 1]
      }
      return null
    }

    watchEffect(() => {
      selectedConversation.value = homeStore.selectedConversation
      isOpen.value = false
    })

    return {
      selectedConversation,
      localMessages,
      isOpen,
      toggleOpen,
      getPreviousMessage
    }
  },
  methods: {
    async loadData() {}
  },
  created() {
    this.loadData()
  }
})
</script>

<style></style>
